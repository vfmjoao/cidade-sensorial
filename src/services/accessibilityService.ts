import * as Speech from 'expo-speech';
import * as Haptics from 'expo-haptics';
import { DisabilityType } from '../types';

/**
 * Serviço para feedback de acessibilidade
 */

/**
 * Fornece feedback por voz
 */
export async function speak(text: string, language: string = 'pt-BR'): Promise<void> {
  try {
    await Speech.speak(text, {
      language,
      pitch: 1.0,
      rate: 0.9,
    });
  } catch (error) {
    console.error('Erro ao falar:', error);
  }
}

/**
 * Para o feedback por voz
 */
export function stopSpeaking(): void {
  Speech.stop();
}

/**
 * Fornece feedback por vibração
 */
export async function vibrate(pattern: 'light' | 'medium' | 'heavy' = 'medium'): Promise<void> {
  try {
    switch (pattern) {
      case 'light':
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        break;
      case 'medium':
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        break;
      case 'heavy':
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        break;
    }
  } catch (error) {
    console.error('Erro ao vibrar:', error);
  }
}

/**
 * Fornece feedback de sucesso por vibração
 */
export async function vibrateSuccess(): Promise<void> {
  try {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  } catch (error) {
    console.error('Erro ao vibrar sucesso:', error);
  }
}

/**
 * Fornece feedback de alerta por vibração
 */
export async function vibrateAlert(): Promise<void> {
  try {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
  } catch (error) {
    console.error('Erro ao vibrar alerta:', error);
  }
}

/**
 * Fornece feedback de erro por vibração
 */
export async function vibrateError(): Promise<void> {
  try {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  } catch (error) {
    console.error('Erro ao vibrar erro:', error);
  }
}

/**
 * Fornece feedback adaptado baseado no tipo de deficiência
 */
export async function provideAccessibilityFeedback(
  text: string,
  disabilityTypes: DisabilityType[],
  type: 'instruction' | 'alert' | 'success' | 'error' = 'instruction'
): Promise<void> {
  // Feedback visual (sem implementação específica ainda)
  
  // Feedback por voz
  if (disabilityTypes.includes(DisabilityType.VISUAL)) {
    await speak(text);
  }

  // Feedback por vibração
  if (disabilityTypes.includes(DisabilityType.HEARING)) {
    switch (type) {
      case 'alert':
        await vibrateAlert();
        break;
      case 'success':
        await vibrateSuccess();
        break;
      case 'error':
        await vibrateError();
        break;
      default:
        await vibrate('medium');
    }
  }
}

