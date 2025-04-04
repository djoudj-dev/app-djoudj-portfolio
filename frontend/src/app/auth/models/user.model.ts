/**
 * Interface définissant la structure d'un utilisateur dans l'application.
 * Contient les informations de base d'un utilisateur authentifié.
 */
export interface User {
  id: string;
  email: string;
  password?: string; // Optional pour ne pas stocker le mot de passe dans localStorage
  role: 'admin' | 'user';
  token?: string;
}
