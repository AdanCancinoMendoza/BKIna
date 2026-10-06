import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  createClient,
  SupabaseClient,
} from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private readonly client: SupabaseClient | null = null;
  private readonly logger = new Logger(SupabaseService.name);

  constructor(
    private readonly configService: ConfigService,
  ) {
    const url =
      this.configService.get<string>('SUPABASE_URL');

    const serviceRoleKey =
      this.configService.get<string>('SUPABASE_SERVICE_ROLE_KEY') ||
      this.configService.get<string>('SUPABASE_KEY') ||
      this.configService.get<string>('SUPABASE_ANON_KEY');

    if (!url || !serviceRoleKey) {
      this.logger.warn(
        'Faltan variables de configuración de Supabase (SUPABASE_URL o credenciales). Cliente de Supabase no inicializado.',
      );
      return;
    }

    this.client = createClient(
      url,
      serviceRoleKey,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      },
    );
  }

  getClient(): SupabaseClient {
    if (!this.client) {
      throw new Error(
        'El cliente de Supabase no está configurado. Verifique las variables de entorno.',
      );
    }
    return this.client;
  }
}