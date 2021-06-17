"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const invite_model_1 = require("./invite-model");
const typeorm_1 = require("typeorm");
const organization_model_1 = require("../organization/organization-model");
const voluntary_model_1 = require("../voluntary/voluntary-model");
const job_model_1 = require("../job/job-model");
class OrganizationController {
    async invite(req, res) {
        let repository = typeorm_1.getRepository(invite_model_1.Invite);
        let { idVoluntary, idOrganization } = req.body;
        let inviteExists = await repository.findOne({ where: {
                id_organization: idOrganization,
                id_voluntary: idVoluntary,
                status: 'pending'
            } });
        if (inviteExists) {
            return res.status(409).send({ message: "this invite already exists and is pending" });
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
        const invite = repository.create({ organization, voluntary, status: 'pending' });
        await repository.save(invite);
        return res.status(201).send(invite);
    }
    async accept(req, res) {
        let repository = typeorm_1.getRepository(invite_model_1.Invite);
        let { idVoluntary, idOrganization } = req.body;
        const invite = await repository.findOne({ where: {
                id_organization: idOrganization,
                id_voluntary: idVoluntary,
                status: 'pending'
            } });
        if (!invite) {
            return res.status(404).send({ message: "invite not found" });
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
        invite.status = 'accepted';
        let jobRepository = typeorm_1.getRepository(job_model_1.Job);
        let job = await jobRepository.create({ organization, voluntary, status: 'in progress' });
        await jobRepository.save(job);
        await repository.save(invite);
        return res.status(200).send(invite);
    }
    async reject(req, res) {
        let repository = typeorm_1.getRepository(invite_model_1.Invite);
        let { idVoluntary, idOrganization } = req.body;
        const invite = await repository.findOne({ where: {
                id_organization: idOrganization,
                id_voluntary: idVoluntary,
                status: 'pending'
            } });
        if (!invite) {
            return res.status(404).send({ message: "invite not found" });
        }
        invite.status = 'rejected';
        await repository.save(invite);
        return res.status(200).send(invite);
    }
    async cancel(req, res) {
        let repository = typeorm_1.getRepository(invite_model_1.Invite);
        let { idVoluntary, idOrganization } = req.body;
        const invite = await repository.findOne({ where: {
                id_organization: idOrganization,
                id_voluntary: idVoluntary,
                status: 'pending'
            } });
        if (!invite) {
            return res.status(404).send({ message: "invite not found" });
        }
        invite.status = 'cancelled';
        await repository.save(invite);
        return res.status(200).send(invite);
    }
    async getByOrganization(req, res) {
        let repository = typeorm_1.getRepository(invite_model_1.Invite);
        let id = req.params.id;
        let invite = await repository.findOne({ where: { idOrganization: id } });
        return res.status(200).send(invite);
    }
    async getByVoluntary(req, res) {
        let repository = typeorm_1.getRepository(invite_model_1.Invite);
        let id = req.params.email;
        let invite = await repository.findOne({ where: { idVoluntary: id } });
        return res.status(200).send(invite);
    }
}
exports.default = new OrganizationController();
