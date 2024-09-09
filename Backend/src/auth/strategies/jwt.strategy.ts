import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
// La stratégie JWT pour l'authentification. Cette classe utilise Passport.js avec JWT.
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    // Le constructeur définit la stratégie JWT en récupérant le token depuis les headers Authorization sous la forme 'Bearer <token>'
    // Utilise une clé secrète définie dans les variables d'environnement.
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extraction du token JWT depuis les headers
      ignoreExpiration: false, // Refuse les tokens expirés
      secretOrKey: configService.get<string>('JWT_SECRET'), // Utilise la clé secrète pour vérifier le token
    });
  }

  // La méthode validate est appelée après la validation du token.
  // Elle permet d'ajouter des informations supplémentaires au contexte de la requête.
  async validate(payload: any) {
    // Retourne un objet utilisateur contenant l'ID et l'email, disponibles dans le payload du JWT.
    return { userId: payload.sub, email: payload.email };
  }
}
