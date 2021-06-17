"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const job_model_1 = require("./job-model");
const typeorm_1 = require("typeorm");
const organization_model_1 = require("../organization/organization-model");
const voluntary_model_1 = require("../voluntary/voluntary-model");
class OrganizationController {
    async save(req, res) {
        let repository = typeorm_1.getRepository(job_model_1.Job);
        let { idOrganization, idVoluntary } = req.body;
        let jobExists = await repository.findOne({ where: [{ idOrganization, idVoluntary }, { status: 'in progress' }] });
        if (jobExists) {
            return res.status(409).send({ message: "job already exists" });
        }
        let orgRepository = typeorm_1.getRepository(organization_model_1.Organization);
        let organization = await orgRepository.findOne({ where: { id: idOrganization } });
        if (!organization) {
            return res.status(404).send({ message: "organization not found" });
        }
        let volRepository = typeorm_1.getRepository(voluntary_model_1.Voluntary);
        let voluntary = await volRepository.findOne({ where: { id: idVoluntary } });
        if (!voluntary) {
            return res.status(404).send({ message: "voluntary not found" });
        }
        const job = repository.create({ organization, voluntary, status: 'in progress' });
        await repository.save(job);
        return res.status(201).send(job);
    }
    async updateHour(req, res) {
        let repository = typeorm_1.getRepository(job_model_1.Job);
        let { idOrganization, idVoluntary, hoursRegistered } = req.body;
        const job = await repository.findOne({ where: [{ idOrganization, idVoluntary }, { status: 'in progress' }] });
        if (!job) {
            return res.status(404).send({ message: "job not found" });
        }
        job.hoursRegistered = hoursRegistered;
        await repository.save(job);
        return res.send(200).send(job);
    }
    async close(req, res) {
        let repository = typeorm_1.getRepository(job_model_1.Job);
        let { idOrganization, idVoluntary } = req.body;
        const job = await repository.findOne({ where: [{ idOrganization, idVoluntary, status: 'in progress' }] });
        if (!job) {
            return res.status(404).send({ message: "job not found" });
        }
        job.status = "finished";
        await repository.save(job);
        return res.send(200).send(job);
    }
    async getByOrganization(req, res) {
        let repository = typeorm_1.getRepository(job_model_1.Job);
        let id = req.params.id;
        let job = await repository.findOne({ where: { idOrganization: id } });
        return res.status(200).send(job);
    }
    async getByVoluntary(req, res) {
        let repository = typeorm_1.getRepository(job_model_1.Job);
        let id = req.params.email;
        let job = await repository.findOne({ where: { idVoluntary: id } });
        return res.status(200).send(job);
    }
}
exports.default = new OrganizationController();
