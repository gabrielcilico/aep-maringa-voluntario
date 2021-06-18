"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const voluntary_model_1 = require("./voluntary-model");
const typeorm_1 = require("typeorm");
const subscription_model_1 = require("../subscription/subscription-model");
class VoluntaryController {
    async save(req, res) {
        let repository = typeorm_1.getRepository(voluntary_model_1.Voluntary);
        let { name, email, photo, birthdate, gender } = req.body;
        let userExists = await repository.findOne({ where: { email } });
        if (userExists) {
            return res.status(409).send({ message: "user already exists" });
        }
        const voluntary = repository.create({ name, email, photo, birthdate, gender });
        await repository.save(voluntary);
        return res.status(200).send(voluntary);
    }
    async update(req, res) {
        let repository = typeorm_1.getRepository(voluntary_model_1.Voluntary);
        let { name, email, photo, birthdate, gender } = req.body;
        const voluntary = await repository.findOne({ where: { email } });
        if (!voluntary) {
            return res.status(404).send({ error: "voluntary not found" });
        }
        if (name) {
            voluntary.name = name;
        }
        if (email) {
            voluntary.email = email;
        }
        if (photo) {
            voluntary.photo = photo;
        }
        if (birthdate) {
            voluntary.birthdate = birthdate;
        }
        if (gender) {
            voluntary.gender = gender;
        }
        await repository.save(voluntary);
        return res.status(200).send(voluntary);
    }
    async getAll(req, res) {
        let repository = typeorm_1.getRepository(voluntary_model_1.Voluntary);
        let [voluntaries] = await repository.findAndCount();
        return res.status(200).send(voluntaries);
    }
    async getByEmail(req, res) {
        let repository = typeorm_1.getRepository(voluntary_model_1.Voluntary);
        let email = req.params.email;
        const voluntary = await repository.findOne({ where: { email } });
        if (!voluntary) {
            return res.status(404).send({ error: "voluntary not found" });
        }
        return res.status(200).send(voluntary);
    }
    async getNotInviteds(req, res) {
        let voluntariesIds = await typeorm_1.getRepository(subscription_model_1.Subscription)
            .createQueryBuilder('subscription')
            .select(['subscription.organizationId'])
            .where('subscription.status = :status', { status: 'pending' })
            .getMany();
        console.log(voluntariesIds);
        let repository = typeorm_1.getRepository(voluntary_model_1.Voluntary);
        const voluntaries = await repository.createQueryBuilder('voluntary')
            .where(`voluntary.id NOT IN (${voluntariesIds})`);
        if (!voluntaries) {
            return res.status(404).send({ error: "all voluntaries are inviteds" });
        }
        return res.status(200).send(voluntaries);
    }
}
exports.default = new VoluntaryController();
