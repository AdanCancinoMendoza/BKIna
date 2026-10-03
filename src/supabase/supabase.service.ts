import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  createClient,
  SupabaseClient,
} from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private readonly client: SupabaseClient;

  constructor(
    private readonly configService: ConfigService,
  ) {
    const url =
      this.configService.get<string>('SUPABASE_URL');

    const serviceRoleKey =
      this.configService.get<string>(
        'SUPABASE_SERVICE_ROLE_KEY',
      );

    if (!url || !serviceRoleKey) {
      throw new Error(
        'Faltan variables de configuración de Supabase',
      );
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
    return this.client;
  }
}