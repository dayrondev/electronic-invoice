import { User } from '@prisma/client';

// this avoid @Request() req: Request & { user: User }
export interface RequestWithUser extends Request {
  user: User;
}
