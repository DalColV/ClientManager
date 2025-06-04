"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerClientRoutes = registerClientRoutes;
exports.registerAssetRoutes = registerAssetRoutes;
exports.registerAllRoutes = registerAllRoutes;
const createClient_usecase_1 = require("../../application/usecases/client/createClient.usecase");
const listClient_usecase_1 = require("../../application/usecases/client/listClient.usecase");
const updateClient_usecase_1 = require("../../application/usecases/client/updateClient.usecase");
const deleteClient_usecase_1 = require("../../application/usecases/client/deleteClient.usecase");
const listAsset_usecase_1 = require("../../application/usecases/asset/listAsset.usecase");
const createAsset_usecase_1 = require("../../application/usecases/asset/createAsset.usecase");
const Client_controller_1 = require("../../crontrollers/Client.controller");
const Asset_controller_1 = require("../../crontrollers/Asset.controller");
const Client_repository_1 = require("../repositories/Client.repository");
const Asset_repository_1 = require("../repositories/Asset.repository");
const listAssetByClient_usecase_1 = require("../../application/usecases/asset/listAssetByClient.usecase");
function registerClientRoutes(app) {
    console.log('Registrando rotas de clients...');
    const clientRepo = new Client_repository_1.ClientRepositoryImpl();
    const createClient = new createClient_usecase_1.CreateClient(clientRepo);
    const listClients = new listClient_usecase_1.ListClients(clientRepo);
    const updateClient = new updateClient_usecase_1.UpdateClient(clientRepo);
    const deleteClient = new deleteClient_usecase_1.DeleteClient(clientRepo);
    const clientController = new Client_controller_1.ClientController(createClient, listClients, updateClient, deleteClient);
    clientController.registerRoutes(app);
}
function registerAssetRoutes(app) {
    console.log('Registrando rotas de assets...');
    const assetRepo = new Asset_repository_1.AssetRepositoryImpl();
    const createAsset = new createAsset_usecase_1.CreateAsset(assetRepo);
    const listAssets = new listAssetByClient_usecase_1.ListAssetsByClient(assetRepo);
    const listAllAssets = new listAsset_usecase_1.ListAssets(assetRepo);
    const assetController = new Asset_controller_1.AssetController(createAsset, listAssets, listAllAssets);
    assetController.registerRoutes(app);
}
function registerAllRoutes(app) {
    registerClientRoutes(app);
    registerAssetRoutes(app);
}
//# sourceMappingURL=client.routes.js.map