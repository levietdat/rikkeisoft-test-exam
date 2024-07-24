import { Seeder, Factory } from "typeorm-seeding";
import { Connection } from "typeorm";
import { User } from "../entities/User";
import { Users } from "../initials/user.initials";
import { Role } from "../entities/Role";
import { hash } from "bcrypt";

export default class CreateDefaultUser implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const userRepo = connection.getRepository(User);
    const roleRepo = connection.getRepository(Role);
    for (const initial of Users) {
      const role = await roleRepo.findOne({
        where: {
          roleCode: initial.role.roleCode,
        },
      });
      if (role) {
        const resolleUser = {
          ...initial,
          role,
          password: await hash(initial.password, 10),
        };

        await userRepo.save(resolleUser);
      }
    }
  }
}
