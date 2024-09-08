import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService, // Injecter le service JWT pour gérer les tokens
  ) {}

  // Méthode pour l'inscription
  async register(createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;

    // Vérification si l'email est déjà utilisé
    const existingUser = await this.usersRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new Error('User with this email already exists.');
    }

    // Hachage du mot de passe avec bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Création et enregistrement de l'utilisateur dans la base de données
    const user = this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });
    await this.usersRepository.save(user);

    return { message: 'User registered successfully' };
  }

  // Connexion
  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    // Recherche de l'utilisateur par email
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Vérification du mot de passe avec bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Création du payload pour le token JWT
    const payload = { email: user.email, sub: user.id };

    // Génération du token JWT
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
