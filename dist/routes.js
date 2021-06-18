"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const voluntary_controller_1 = __importDefault(require("./voluntary/voluntary-controller"));
const organization_controller_1 = __importDefault(require("./organization/organization-controller"));
const invite_controller_1 = __importDefault(require("./invite/invite-controller"));
const subcription_controller_1 = __importDefault(require("./subscription/subcription-controller"));
const job_controller_1 = __importDefault(require("./job/job-controller"));
const home_controller_1 = __importDefault(require("./home/home-controller"));
const routes = express_1.Router();
exports.routes = routes;
routes.get('/', home_controller_1.default.getInfo);
routes.post('/voluntary', voluntary_controller_1.default.save);
routes.put('/voluntary', voluntary_controller_1.default.update);
routes.get('/voluntary', voluntary_controller_1.default.getAll);
routes.get('/voluntary/:email', voluntary_controller_1.default.getByEmail);
routes.get('/voluntary/get/notInviteds', voluntary_controller_1.default.getNotInviteds);
routes.get('/voluntary/getbyId/:id', voluntary_controller_1.default.getById);
routes.post('/organization', organization_controller_1.default.save);
routes.put('/organization', organization_controller_1.default.update);
routes.get('/organization', organization_controller_1.default.getAll);
routes.get('/organization/:id', organization_controller_1.default.getById);
routes.get('/organization/getByEmail/:email', organization_controller_1.default.getByEmail);
routes.get('/organization/category/:category', organization_controller_1.default.getByCategory);
routes.post('/invite', invite_controller_1.default.invite);
routes.post('/invite/accept', invite_controller_1.default.accept);
routes.post('/invite/cancel', invite_controller_1.default.cancel);
routes.post('/invite/reject', invite_controller_1.default.reject);
routes.get('/invite/byOrganization/:id', invite_controller_1.default.getByOrganization);
routes.get('/invite/byVoluntary/:id', invite_controller_1.default.getByVoluntary);
routes.post('/subscription', subcription_controller_1.default.subscribe);
routes.post('/subscription/accept', subcription_controller_1.default.accept);
routes.post('/subscription/cancel', subcription_controller_1.default.cancel);
routes.post('/subscription/reject', subcription_controller_1.default.reject);
routes.get('/subscription/byOrganization/:id', subcription_controller_1.default.getByOrganization);
routes.get('/subscription/byVoluntary/:id', subcription_controller_1.default.getByVoluntary);
routes.post('/job', job_controller_1.default.save);
routes.put('/job/update', job_controller_1.default.updateHour);
routes.post('/job/close', job_controller_1.default.close);
routes.get('/job/byOrganization/:id', job_controller_1.default.getByOrganization);
routes.get('/job/byVoluntary/:id', job_controller_1.default.getByVoluntary);
