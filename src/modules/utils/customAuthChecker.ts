import { AuthChecker } from 'type-graphql';
import { MyContext } from 'src/types/MyContext';

export const customAuthChecker: AuthChecker<MyContext> = ({ context: { req } }) => {
  return !!req.session!.userId;
};
