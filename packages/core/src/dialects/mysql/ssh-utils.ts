
import { Client } from 'ssh2';
import type { ClientChannel } from 'ssh2';
import type { ConnectionOptions } from '../../sequelize';

export const getStream = async (config: ConnectionOptions): Promise<ClientChannel> => {
  const conn = new Client();

  return new Promise((resolve, reject) => {
    conn.on('ready', () => {
      // SSH connection established.
      conn.forwardOut('127.0.0.1', 12_345, config.host!, 3306,
        (err, stream) => {
          if (err) {
            // Port forwarding error
            reject(new Error(`Port forwarding error: ${err}`));
            conn.end();

            return;
          }

          stream.on('close', () => conn.end());
          resolve(stream);
        });
    }).on('error', err => {
      // SSH connection error
      reject(new Error(`SSH connection error: ${err}`));
    }).connect(config.ssh!);
  });
};
