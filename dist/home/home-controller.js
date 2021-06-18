"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HomeController {
    async getInfo(req, res, app) {
        return res.status(200).send({
            name: "API Maringá Voluntário",
            details: "API criada por alunos do quarto ano de Engenharia de Software da Unicesumar cujo intuito é a criação de uma aplicação com a finalidade de unir voluntários à entidades filantrópicas.",
            backEnd: "maringavoluntario.herokuapp.com/",
            backEndRepository: "https://github.com/gabrielcilico/aep-maringa-voluntario",
            frontEnd: "https://maringa-voluntario.vercel.app",
            frontEndRepository: "https://github.com/jordaoqualho/aep-maringa-voluntario-front",
            documentation: "/swagger"
        });
    }
}
exports.default = new HomeController();
