"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const subscription_model_1 = require("./subscription-model");
const typeorm_1 = require("typeorm");
const organization_model_1 = require("../organization/organization-model");
const voluntary_model_1 = require("../voluntary/voluntary-model");
const job_model_1 = require("../job/job-model");
class SubscriptionController {
    async subscribe(req, res) {
        let repository = typeorm_1.getRepository(subscription_model_1.Subscription);
        let { idVoluntary, idOrganization } = req.body;
        let subscriptionExists = await repository.findOne({ where: {
                id_organization: idOrganization,
                id_voluntary: idVoluntary,
                status: 'pending'
            } });
        if (subscriptionExists) {
            return res.status(409).send({ message: "this subscription already exists and is pending" });
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
        const subscription = repository.create({ organization, voluntary, status: 'pending' });
        await repository.save(subscription);
        return res.status(201).send(subscription);
    }
    async accept(req, res) {
        let repository = typeorm_1.getRepository(subscription_model_1.Subscription);
        let { idVoluntary, idOrganization } = req.body;
        const subscription = await repository.findOne({ where: {
                id_organization: idOrganization,
                id_voluntary: idVoluntary,
                status: 'pending'
            } });
        if (!subscription) {
            return res.status(404).send({ message: "subscription not found" });
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
        let jobRepository = typeorm_1.getRepository(job_model_1.Job);
        let job = await jobRepository.create({ organization, voluntary, status: 'in progress' });
        await jobRepository.save(job);
        subscription.status = 'accepted';
        await repository.save(subscription);
        return res.status(200).send(subscription);
    }
    async reject(req, res) {
        let repository = typeorm_1.getRepository(subscription_model_1.Subscription);
        let { idVoluntary, idOrganization } = req.body;
        const subscription = await repository.findOne({ where: {
                id_organization: idOrganization,
                id_voluntary: idVoluntary,
                status: 'pending'
            } });
        if (!subscription) {
            return res.status(404).send({ message: "subscription not found" });
        }
        subscription.status = 'rejected';
        await repository.save(subscription);
        return res.status(200).send(subscription);
    }
    async cancel(req, res) {
        let repository = typeorm_1.getRepository(subscription_model_1.Subscription);
        let { idVoluntary, idOrganization } = req.body;
        const subscription = await repository.findOne({ where: {
                id_organization: idOrganization,
                id_voluntary: idVoluntary,
                status: 'pending'
            } });
        if (!subscription) {
            return res.status(404).send({ message: "subscription not found" });
        }
        subscription.status = 'cancelled';
        await repository.save(subscription);
        return res.status(200).send(subscription);
    }
    async getByOrganization(req, res) {
        let repository = typeorm_1.getRepository(subscription_model_1.Subscription);
        let id = req.params.id;
        let subscription = await repository.findOne({ where: { idOrganization: id } });
        return res.status(200).send(subscription);
    }
    async getByVoluntary(req, res) {
        let repository = typeorm_1.getRepository(subscription_model_1.Subscription);
        let id = req.params.email;
        let subscription = await repository.findOne({ where: { idVoluntary: id } });
        return res.status(200).send(subscription);
    }
}
exports.default = new SubscriptionController();
