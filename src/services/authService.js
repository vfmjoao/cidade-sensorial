import { getUserByEmail, createUser, getUserById } from '../database/db';
import * as SecureStore from 'expo-secure-store';

// Criar sessão de autenticação
export const createSession = async (userId) => {
  try {
    const token = generateToken();
    await SecureStore.setItemAsync('auth_token', token);
    await SecureStore.setItemAsync('user_id', userId.toString());
    return { token, userId };
  } catch (error) {
    console.error('Erro ao criar sessão:', error);
    throw error;
  }
};

// Verificar se o usuário está autenticado
export const checkAuth = async () => {
  try {
    const token = await SecureStore.getItemAsync('auth_token');
    const userId = await SecureStore.getItemAsync('user_id');
    
    if (token && userId) {
      return { authenticated: true, userId: parseInt(userId) };
    }
    return { authenticated: false };
  } catch (error) {
    console.error('Erro ao verificar autenticação:', error);
    return { authenticated: false };
  }
};

// Fazer logout
export const logout = async () => {
  try {
    await SecureStore.deleteItemAsync('auth_token');
    await SecureStore.deleteItemAsync('user_id');
    return true;
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
    return false;
  }
};

// Registrar novo usuário
export const register = async (nome, email, password) => {
  try {
    // Verificar se o email já existe
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      throw new Error('Email já cadastrado');
    }
    
    // Criar usuário
    const userId = await createUser(nome, email, password);
    
    // Criar sessão
    const session = await createSession(userId);
    
    return session;
  } catch (error) {
    console.error('Erro ao registrar:', error);
    throw error;
  }
};

// Login local
export const login = async (email, password) => {
  try {
    const user = await getUserByEmail(email);
    
    if (!user) {
      throw new Error('Email ou senha incorretos');
    }
    
    // Por enquanto, comparar senha direto (depois implementar hash)
    // TODO: Implementar bcrypt ou similar
    if (user.senha !== password) {
      throw new Error('Email ou senha incorretos');
    }
    
    // Criar sessão
    const session = await createSession(user.id);
    
    return { ...session, user };
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw error;
  }
};

// Login com Google (placeholder)
export const loginWithGoogle = async () => {
  // TODO: Implementar integração com Google OAuth
  console.log('Login com Google ainda não implementado');
  throw new Error('Funcionalidade em desenvolvimento');
};

// Gerar token simples
const generateToken = () => {
  return `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

