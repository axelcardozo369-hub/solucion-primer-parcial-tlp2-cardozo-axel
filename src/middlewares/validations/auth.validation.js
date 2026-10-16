// * ARCHIVO A COMPLETAR
import { body } from "express-validator";
import { UserModel, ProfileModel } from "../../models/index.js";

export const registerValidation = [
  // TODO: 1. Validar username: obligatorio, entre 3 y 20 caracteres y único (UserModel).
  body("username")
    .notEmpty()
    .withMessage("el username debe ser obligatirio")
    .bail()
    .isLength({ min: 3, max: 20 })
    .custom(async (username) => {
      const usernameExiste = await UserModel.findOne({
        where: { username: username },
      });
      if (usernameExiste) {
        throw new Error("el username ya existe");
      }
    }),
  // TODO: 2. Validar email: obligatorio, con formato válido y único.
  body("email")
    .notEmpty()
    .withMessage("el email debe ser obligatorio ")
    .bail()
    .isEmail()
    .withMessage("el email debe ser si o si valido")
    .custom(async (email) => {
      const emailExiste = await UserModel.findOne({ where: { email: email } });
      if (emailExiste) {
        throw new Error("eL email ya existe hacia otro usuario");
      }
    }),

  // TODO: 3. Validar password: obligatoria, con mínimo de 8 caracteres.
  body("password")
    .notEmpty()
    .withMessage("el password debe ser obligatorio")
    .bail()
    .isLength({ min: 8 })
    .withMessage("el password debe tener hasta minimo 8 caracteres")
    .bail(),
  // TODO: 4. Validar role: opcional y limitado a los roles permitidos.
  body("role").optional(),
  // TODO: 5. Validar profile.employee_number: obligatorio y único (ProfileModel).
  body("profile.employee_number")
    .notEmpty()
    .withMessage("el employee_number debe ser obligatorio")
    .bail()
    .custom(async (employee_number) => {
      const nroEmpleadoExiste = await ProfileModel.findOne({
        where: { employee_number: employee_number },
      });
      if (nroEmpleadoExiste) {
        throw new Error("ya existe el numero del empleado");
      }
    })
    .custom(async () => {}),
  // TODO: 6. Validar profile.first_name y profile.last_name como obligatorios, y profile.phone como opcional.
  body("profile.first_name")
    .notEmpty()
    .withMessage("el first_name debe ser obligatorio")
    .bail(),
  body("profile.last_name")
    .notEmpty()
    .withMessage("el last_name debe ser obligatorio")
    .bail(),
  body("profile.phone")
    .optional()
    .notEmpty()
    .withMessage("el phone debe ser obligatorio"),
  // ? Las unicidades requieren una validación personalizada asíncrona.
];

export const loginValidation = [
  // TODO: 7. Validar email: obligatorio y con formato válido.
  body("email")
    .notEmpty()
    .withMessage("el email debe ser obligatorio")
    .bail()
    .isEmail()
    .withMessage("el email debe ser valido"),
  // TODO: 8. Validar password: obligatoria.-
  body("password").notEmpty().withMessage("el password debe ser obligatoria"),
];
