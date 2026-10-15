// * ARCHIVO A COMPLETAR
import { body, param } from "express-validator";
import {
  ProjectModel,
  TechnologyModel,
  UserModel,
} from "../../models/index.js";

export const createProjectValidation = [
  // TODO: 1. Validar code: obligatorio y único (ProjectModel).
  body("code")
    .notEmpty()
    .withMessage("el code debe ser obligatorio")
    .custom(async (code) => {
      const codeExiste = await ProjectModel.findOne({ where: { code: code } });
      if (codeExiste) {
        throw new Error("el code ya existe ya");
      }
    }),
  // TODO: 2. Validar name y description como obligatorios.
  body("name").notEmpty().withMessage("el name debe ser obligatorio"),
  body("description")
    .notEmpty()
    .withMessage("la description debe ser obligatorio"),
  // TODO: 3. Validar status: opcional y limitado a los estados permitidos.
  body("status")
    .optional()
    .isIn(["planning", "in_progress", "paused", "finished"])
    .withMessage(
      "el status debe ser al menos planning, in_progress,paused o finished",
    ),
  // TODO: 4. Validar start_date como fecha válida y budget como número positivo, ambos obligatorios.
  body("start_date")
    .notEmpty()
    .withMessage("el start_date debe ser obligatorio")
    .isDate()
    .withMessage("la fecha debe ser valida"),
  body("budget")
    .notEmpty()
    .withMessage("budged debe ser obligatorio ")
    .isFloat({ gt: 0 })
    .withMessage("el budget debe ser mayor a 0"),
  // TODO: 5. Validar leader_id: debe existir y pertenecer a un usuario activo (UserModel).
  body("leader_id")
    .isInt({ min: 1 })
    .withMessage("el id debe ser valido")
    .custom(async (id) => {
      const user = await UserModel.findByPk(id);
      if (!user) {
        throw new Error("el usuario no existe ");
      }
    }),
  // TODO: 6. Validar technologies: lista de ids que existan (TechnologyModel).
  body("technologies")
    .isArray()
    .withMessage("technologies deber ser una lista"),
  body("technologies.*")
    .isInt({ min: 1 })
    .withMessage("cada technologies debe ser valido")
    .custom(async (id) => {
      const technologieExiste = await TechnologyModel.findByPk(id);
      if (!technologieExiste) {
        throw new Error("la technology no existe con ese id");
      }
    }),
  // ? Un usuario eliminado lógicamente no puede ser líder: comprobar que la búsqueda lo deje afuera.
];

export const updateProjectValidation = [
  // TODO: 7. Validar code como opcional y único, excluyendo el propio proyecto que se edita.
  body("code")
    .optional()
    .custom(async (code, { req }) => {
      const codeExiste = await ProjectModel.findOne({ where: { code: code } });
      if (codeExiste && codeExiste.id !== Number(req.params.id)) {
        throw new Error("el code ya existe");
      }
    }),
  // TODO: 8. Validar name y description como opcionales y no vacíos.
  body("name")
    .optional()
    .notEmpty()
    .withMessage("el name no puede estar vacio"),
  body("description")
    .optional()
    .notEmpty()
    .withMessage("la description no puede ser vacia"),
  // TODO: 9. Validar status, start_date y budget como opcionales, con las mismas reglas que al crear.
  body("status")
    .optional()
    .isIn(["planning", "in_progress", "paused", "finished"])
    .withMessage(
      "el status debe ser al menos planning, in_progress,paused o finished",
    ),
  body("start_date")
    .optional()
    .notEmpty()
    .withMessage("el start_date debe ser obligatorio")
    .isDate()
    .withMessage("la fecha debe ser valida"),
  body("budget")
    .optional()
    .notEmpty()
    .withMessage("budged debe ser obligatorio ")
    .isFloat({ gt: 0 })
    .withMessage("el budget debe ser mayor a 0"),
  // TODO: 10. Validar leader_id como opcional, existente y de un usuario activo.
  body("leader_id")
    .optional()
    .isInt({ min: 1 })
    .withMessage("el leader_id debe ser valido")
    .custom(async (id) => {
      const user = await UserModel.findByPk(id);
      if (!user) {
        throw new Error("el usuario no existe");
      }
    }),
  // TODO: 11. Validar technologies como opcional, con ids que existan.
  body("technologies")
    .optional()
    .isArray()
    .withMessage("technologies debe ser una lista de ids"),
  body("technologies.*")
    .isInt({ min: 1 })
    .withMessage("cada technology debe ser un id valido")
    .custom(async (id) => {
      const technology = await TechnologyModel.findByPk(id);
      if (!technology) {
        throw new Error(`la technology con id ${id} no existe`);
      }
    }),
  // ? Para saber qué proyecto se edita, el id se obtiene de los parámetros de la ruta (req.params).
];
