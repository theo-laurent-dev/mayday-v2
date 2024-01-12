import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import chalk from "chalk";
const db = new PrismaClient();

//---- TO RUN SEED ----
// > set "type": "module" in package.json
// > npx prisma migrate reset
// > npx prisma db push
// > npx prisma generate
// > npx prisma db seed
// > delete "type": "module" in package.json
//----------------------

async function seed() {
  console.log(chalk.cyan("---- PROFILES ----"));
  //---- PROFILE ----
  const admin = await db.profile.create({
    data: {
      name: "admin",
      label: "Administrateur",
      permissions: [
        "dashboard.*",
        "sheets.*",
        "admin.*",
        "users.*",
        "profiles.*",
        "account.*",
        "password.*",
      ],
    },
  });
  console.log(`Creation de "${admin.label}" : ${chalk.green("succès")}`);
  const defaut = await db.profile.create({
    data: {
      name: "default",
      label: "Défaut",
      permissions: [
        "dashboard.view",
        "sheets.update",
        "sheets.create",
        "sheets.view",
        "password.update",
        "sheets.report",
        "account.*",
      ],
    },
  });
  console.log(`Creation de "${defaut.label}" : ${chalk.green("succès")}`);

  console.log(chalk.cyan("---- USERS ----"));
  //---- USER ----
  const hashedPassword = await bcrypt.hash("azerty", 12);
  const theo = await db.user.create({
    data: {
      name: "Théo LAURENT",
      email: "theo.lrt@outlook.fr",
      hashedPassword,
      profileId: admin.id,
    },
  });
  console.log(`Creation de "${theo.name}" : ${chalk.green("succès")}`);

  //---- APPLICATIONS & ROLES ----
  console.log(chalk.cyan("---- APPLICATIONS & ROLES ----"));
  const account = await db.application.create({
    data: {
      name: "account",
      label: "Compte",
      roles: {
        create: [
          {
            name: "update",
            label: "Mettre à jour son compte",
            Profiles: {
              connect: [{ id: admin.id }, { id: defaut.id }],
            },
          },
        ],
      },
    },
    include: {
      roles: true,
    },
  });
  console.log(`Creation de "${account.label}" : ${chalk.green("succès")}`);
  account.roles.map((r) =>
    console.log(`* Creation du role "${r.label}" : ${chalk.green("succès")}`)
  );

  const password = await db.application.create({
    data: {
      name: "password",
      label: "Mot de passe",
      roles: {
        create: [
          {
            name: "update",
            label: "Mettre à jour son mot de passe",
            Profiles: {
              connect: [{ id: admin.id }, { id: defaut.id }],
            },
          },
        ],
      },
    },
    include: {
      roles: true,
    },
  });
  console.log(`Creation de "${password.label}" : ${chalk.green("succès")}`);
  password.roles.map((r) =>
    console.log(`* Creation du role "${r.label}" : ${chalk.green("succès")}`)
  );

  const dashboard = await db.application.create({
    data: {
      name: "dashboard",
      label: "Dashboard",
      roles: {
        create: [
          {
            name: "view",
            label: "Voir le dashboard",
            Profiles: {
              connect: [{ id: admin.id }, { id: defaut.id }],
            },
          },
        ],
      },
    },
    include: {
      roles: true,
    },
  });
  console.log(`Creation de "${dashboard.label}" : ${chalk.green("succès")}`);
  dashboard.roles.map((r) =>
    console.log(`* Creation du role "${r.label}" : ${chalk.green("succès")}`)
  );

  const users = await db.application.create({
    data: {
      name: "users",
      label: "Utilisateurs",
      roles: {
        create: [
          {
            name: "view",
            label: "Voir les utilisateurs",
            Profiles: {
              connect: [{ id: admin.id }],
            },
          },
          {
            name: "create",
            label: "Créer un utilisateur",
            Profiles: {
              connect: [{ id: admin.id }],
            },
          },
          {
            name: "update",
            label: "Modifier un utilisateurs",
            Profiles: {
              connect: [{ id: admin.id }],
            },
          },
          {
            name: "activate",
            label: "Activer un utilisateur",
            Profiles: {
              connect: [{ id: admin.id }],
            },
          },
          {
            name: "deactivate",
            label: "Désactiver un utilisateur",
            Profiles: {
              connect: [{ id: admin.id }],
            },
          },
          {
            name: "delete",
            label: "Supprimer un utilisateur",
            Profiles: {
              connect: [{ id: admin.id }],
            },
          },
        ],
      },
    },
    include: {
      roles: true,
    },
  });
  console.log(`Creation de "${users.label}" : ${chalk.green("succès")}`);
  users.roles.map((r) =>
    console.log(`* Creation du role "${r.label}" : ${chalk.green("succès")}`)
  );

  const profiles = await db.application.create({
    data: {
      name: "profiles",
      label: "Profils",
      roles: {
        create: [
          {
            name: "view",
            label: "Voir les profils",
            Profiles: {
              connect: [{ id: admin.id }],
            },
          },
          {
            name: "update",
            label: "Mettre un jour un profil",
            Profiles: {
              connect: [{ id: admin.id }],
            },
          },
          {
            name: "create",
            label: "Créer des profils",
            Profiles: {
              connect: [{ id: admin.id }],
            },
          },
          {
            name: "delete",
            label: "Supprimer un profil",
            Profiles: {
              connect: [{ id: admin.id }],
            },
          },
        ],
      },
    },
    include: {
      roles: true,
    },
  });
  console.log(`Creation de "${profiles.label}" : ${chalk.green("succès")}`);
  profiles.roles.map((r) =>
    console.log(`* Creation du role "${r.label}" : ${chalk.green("succès")}`)
  );

  const sheets = await db.application.create({
    data: {
      name: "sheets",
      label: "Fiches",
      roles: {
        create: [
          {
            name: "view",
            label: "Voir les fiches",
            Profiles: {
              connect: [{ id: admin.id }, { id: defaut.id }],
            },
          },
          {
            name: "update",
            label: "Modifier une fiche",
            Profiles: {
              connect: [{ id: admin.id }, { id: defaut.id }],
            },
          },
          {
            name: "create",
            label: "Créer une fiche",
            Profiles: {
              connect: [{ id: admin.id }, { id: defaut.id }],
            },
          },
          {
            name: "delete",
            label: "Supprimer une fiche",
            Profiles: {
              connect: [{ id: admin.id }],
            },
          },
          {
            name: "favorite",
            label: "Ajouter ou supprimer une fiche des favoris",
            Profiles: {
              connect: [{ id: admin.id }, { id: defaut.id }],
            },
          },
          {
            name: "report",
            label: "Signaler une fiche obsolète",
            Profiles: {
              connect: [{ id: admin.id }, { id: defaut.id }],
            },
          },
        ],
      },
    },
    include: {
      roles: true,
    },
  });
  console.log(`Creation de "${sheets.label}" : ${chalk.green("succès")}`);
  sheets.roles.map((r) =>
    console.log(`* Creation du role "${r.label}" : ${chalk.green("succès")}`)
  );

  //---- SHEETS ----
  console.log(chalk.cyan("---- SHEETS ----"));
  const sheet1 = await db.sheet.create({
    data: {
      title: "sheet 1",
      shortDescription: "sheet 1",
      description: "<h1>test</h1>",
      assignmentGroup: "FR_APP_L2",
      businessApp: "ERP",
      category: "software",
      subcategory: "excel",
      categoryType: "issue",
      criticity: "low",
      published: true,
      type: "procedure",
      company: "nicoll",
      userId: theo.id,
    },
  });
  console.log(`Creation de "${sheet1.title}" : ${chalk.green("succès")}`);
}

seed()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
