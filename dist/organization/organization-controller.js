"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const organization_model_1 = require("./organization-model");
const typeorm_1 = require("typeorm");
class OrganizationController {
    async save(req, res) {
        let repository = typeorm_1.getRepository(organization_model_1.Organization);
        let { id, name, email, description, category, phone, street, number, zipCode, neighborhood, complement, photo } = req.body;
        let organizationExists = await repository.findOne({ where: [{ id, email }, { email }] });
        if (organizationExists) {
            return res.status(409).send({ message: "organization already exists" });
        }
        const organization = repository.create({
            id, name, email, description, category, phone, street, number, zipCode, neighborhood, complement, photo
        });
        await repository.save(organization);
        return res.status(201).send(organization);
    }
    async update(req, res) {
        let repository = typeorm_1.getRepository(organization_model_1.Organization);
        let { id, name, email, description, category, phone, street, number, zipCode, neighborhood, complement, photo } = req.body;
        const organization = await repository.findOne({ where: { id } });
        if (!organization) {
            return res.status(404).send({ error: "organization not found" });
        }
        if (name) {
            organization.name = name;
        }
        if (email) {
            organization.email = email;
        }
        if (description) {
            organization.description = description;
        }
        if (category) {
            organization.category = category;
        }
        if (phone) {
            organization.phone = phone;
        }
        if (street) {
            organization.street = street;
        }
        if (number) {
            organization.number = number;
        }
        if (zipCode) {
            organization.zipCode = zipCode;
        }
        if (neighborhood) {
            organization.neighborhood = neighborhood;
        }
        if (complement) {
            organization.complement = complement;
        }
        if (photo) {
            organization.photo = photo;
        }
        await repository.save(organization);
        return res.status(200).send(organization);
    }
    async getAll(req, res) {
        let repository = typeorm_1.getRepository(organization_model_1.Organization);
        let [organizations] = await repository.findAndCount();
        return res.status(200).send(organizations);
    }
    async getById(req, res) {
        let repository = typeorm_1.getRepository(organization_model_1.Organization);
        let id = req.params.id;
        let organization = await repository.findOne({ where: { id } });
        return res.status(200).send(organization);
    }
    async getByCategory(req, res) {
        let repository = typeorm_1.getRepository(organization_model_1.Organization);
        let category = req.params.category;
        let organizations = await repository.find({ where: { category } });
        return res.status(200).send(organizations);
    }
}
exports.default = new OrganizationController();
