import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
// Service d'authentification gérant l'inscription et la connexion
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,  // Injection du dépôt User pour manipuler les utilisateurs
    private jwtService: JwtService,  // Injection du service JWT pour gérer les tokens
  ) {}

  // Méthode pour l'inscription
  async register(createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;

    // Vérification si l'email est déjà utilisé
    const existingUser = await this.usersRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new Error('User with this email already exists.');  // Erreur si l'utilisateur existe déjà
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
    await this.usersRepository.save(user);  // Sauvegarde de l'utilisateur en base

    return { message: 'User registered successfully' };  // Confirmation de l'inscription
  }

  // Méthode pour la connexion
  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    // Recherche de l'utilisateur par email
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');  // Erreur si l'utilisateur n'existe pas
    }

    // Vérification du mot de passe avec bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');  // Erreur si le mot de passe est incorrect
    }

    // Création du payload pour le token JWT
    const payload = { email: user.email, sub: user.id };

    // Génération du token JWT et renvoi à l'utilisateur
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
