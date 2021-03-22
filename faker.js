var faker = require('../../faker.js/index.js');
const router = require("express").Router();
const pool = require("./db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("./utils/jwtgenerator");
const verifyInfo = require("./middleware/validInfo");
const { isAuth } = require("./middleware/isAuth");
const jwt = require("jsonwebtoken");
const { phone } = require('../../faker.js/index.js');
require("dotenv").config();
faker.locale = "en_IND";

let addUser = async function () {
    var firstName = faker.name.firstName()
    var lastName = faker.name.lastName()
    var phoneNumber = faker.phone.phoneNumber()
    var email = faker.internet.email(firstName, lastName)
    var password = "123456789"
    console.log(firstName)

    // const verCheck = await pool.query("SELECT * FROM otp WHERE otp_phone=$1 and otp_ver = true", [phoneNumber]);
    // if (verCheck.rows.length === 0) {
    //     console.log("phone no. not verified,Please verify your No.")
    //     return "phone no. not verified,Please verify your No.";
    // };
    // check if user exsist
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);
    // // res.json(user.rows);
    // // console.log(user.rows.length);
    if (user.rows.length << 0) {
        console.log("USER ALREADY EXSIST")
        return "USER ALREADY EXSIST";
    };
    //check if phone no. exsist
    const phone_no = await pool.query("SELECT * FROM users WHERE user_phone = $1", [phoneNumber]);
    if (phone_no.rows.length << 0) {
        console.log("Phone no. in use")
        return "Phone no. in use"
    };
    //bcrypting password
    const saltRound = 9;//no. of time to bcrypt password
    const Salt = bcrypt.genSalt(saltRound)
    const bcryptPassword = await bcrypt.hash(password, saltRound)//will ecrylic password 9 times
    // adding user to the database (storing database)
    const newUser = await pool.query("INSERT INTO users(user_firstname,user_lastname,user_phone, user_email, user_password) VALUES ($1,$2,$3,$4,$5) RETURNING user_firstname,user_lastname,user_phone, user_email", [firstName, lastName, phoneNumber, email, bcryptPassword]);
    // nr.token = JSON.stringify(token);
    console.log(newUser.rows)

}

// console.log(hjk)
// console.log(firstName)
// console.log(lastName)
// console.log(phoneNumber)
// console.log(email)
// console.log(password)
// for (let i = 0; i < 100; i++) {
//     hjk = addUser()
// }
// const user =  pool.query("SELECT * FROM users ");
// console.log(user.rows)

// let getUserId = async function () {
//     const user = await pool.query("SELECT user_id FROM users ");
//     // console.log(user.rows)
//     setTimeout(
//         return userid.push(user.rows[i].user_id)
//     for (let i = 0; i < user.rows.length; i++) {
//     }, 10000)
// }
// getUserId()
// let h = userid
// console.log(h)

userid = [
    "2b087091-8e83-4f74-8e84-2be9ec5783c5",
    "be53468c-a3e9-4649-a5d9-3c71cd3e2b69",
    "8a6036a2-228c-4dee-a807-86590d82d792",
    "d47bde2a-4b46-4545-bbe8-46516a10b23b",
    "26e58fd7-5bcc-4e4f-82f7-2d01efe99ddb",
    "ed29ab1f-daf2-49fa-873a-9d261087a7c2",
    "bf876a97-cab5-43f2-821f-4ea721b787dc",
    "2b5a3b92-baba-4dd3-a974-96197f2abcf0",
    "b2291d87-58b8-49aa-9883-bd99abfb29a3",
    "3bee582d-0f10-46c9-bc43-d22bad1ba73f",
    "38a1a224-f015-4efe-acb1-322a774a43c2",
    "29bc0763-bb5f-40ef-883c-022f6589c664",
    "ee41c2c1-936d-41f7-8145-1908f393cc46",
    "e777526c-c4cf-41cb-bee2-159cee706e43",
    "91634c5f-5f0b-4f3c-a115-c46f3fad7884",
    "58933433-a48c-4288-ab91-04e64acd98ea",
    "af8b457a-92a3-48e7-9c87-cf0bae42d8a9",
    "3c634a9c-6af2-4869-85df-2e7ea8a303ee",
    "ff078abb-bfa2-4c1c-abb8-2bdd90d4218e",
    "f3f47668-deac-436b-8660-6d7e02bac7ac",
    "580be104-c001-47c6-9e33-a2a28daab8d6",
    "d274c3af-d42e-4b64-8840-8a9269650ec6",
    "b3fffee2-5dba-43fc-9675-d74f2e36202d",
    "08ae0a80-e2a7-49e9-bbb2-8c1a1ff68b33",
    "8595e819-5819-4e23-b68c-7cc30b61c589",
    "a73e711e-ef24-4f32-ae38-1321268806b9",
    "9edc1868-f9a9-48ce-bbbe-e44e79e92c4b",
    "0088bfc7-9cd2-4f52-af30-fc0ae5f61ce4",
    "be1f59dc-62e3-442a-8ed1-7fd1db661dc3",
    "33e1fabb-4d26-427f-aee0-5c003e2b0a5f",
    "3f62ff02-6baf-4d33-8b98-dee8fb13bcc8",
    "7c8fa1b8-82fb-4d53-ae58-e3a461b46a71",
    "35d44fcc-5f09-40ed-9f1e-c18eb48aafb5",
    "03d44d88-ea3b-4079-9d02-83feab00293d",
    "d8c93d35-c7ce-4316-8af5-fee410ef1129",
    "8f372e23-22df-484e-87d7-4d268c1a99c5",
    "b9fd29ad-808f-40f9-be5a-b73522369d88",
    "1d963a01-9b14-4ae2-9ebe-14a130bb8a4f",
    "d6d66bdc-027c-4449-b1a8-bc31b223ca64",
    "79197d5a-4dd6-4024-a12d-f759dd0da3ce",
    "61e1dd3f-5625-434d-bff8-8943979d7abc",
    "1fc69d73-4ad1-4e1a-b9dc-e7011f9ba173",
    "0cd1a27d-2e84-462a-b26d-4dab97f32d3f",
    "286e4ab9-3a14-4816-98db-1c131d76652f",
    "d22bb86c-7d1b-485c-8d6f-06e34c92c01a",
    "6ea3a869-9ee9-4329-8dd4-702b3d9b9566",
    "5a1f803c-6c74-416c-980f-3824c321f593",
    "88120580-8e95-4797-b948-63d98b5fce50",
    "599d8b5a-62c6-4818-9ebc-af7e46713652",
    "340c134e-f702-4e1e-87a6-c49a6d7ab845",
    "cd4f009a-d13f-44f5-a827-d57fee25fb5b",
    "4a7150ef-1dfb-4b7c-b575-62631015ad55",
    "e59a7c44-6227-425a-bcb2-fa55cb9361b1",
    "c4f36ea3-8ede-4e8c-8a8e-c984d12fafc8",
    "f1735a5f-91f9-4073-b6c9-5c5dc8af22e3",
    "677d1bd2-3b21-4a47-9ff4-546c070eba35",
    "158a08b7-1a89-4743-a198-c22f69daf57f",
    "9bde6b1e-a1a3-4489-8b98-c43805d42921",
    "3dab74fb-eaf6-4763-9d5c-a444731060fb",
    "57f7f6e7-9405-4def-af2c-2033f1573056",
    "224ae0d2-757a-4323-8f08-78c6ea7b302e",
    "51eb50c1-35a6-4e7d-b2bb-38c489f02163",
    "065e6447-b63b-4f70-ac98-9746587be997",
    "bf5263b2-49ac-42ef-835f-b6af817989c5",
    "8d88f127-b3a9-48bf-8030-732763958283",
    "9092d6a9-bba7-4697-af49-9e29e55d555a",
    "38b2b6a9-78c0-4b40-99f7-76090ccccc3b",
    "f1d1412b-8bfc-4573-8ad4-5229f14b9091",
    "760e63dd-43c0-4c3e-973d-b4d9097e1ca2",
    "ac1b7935-28e6-4108-a926-020c818f0834",
    "39bbac4d-84f9-42ee-befb-c6844ef45507",
    "7dd5e25d-e06f-48f7-a8dd-d711707e8185",
    "f531c420-5c9f-4c5c-9187-400168c0e2b1",
    "38899540-7235-4af3-8842-5437497a5b2e",
    "97b84949-6143-49a9-86b7-ea8686160d28",
    "a22677f9-6c15-4c83-a8cc-7193ddbdc3d8",
    "a50b17b6-524e-482c-a789-911b60249389",
    "a1e90c70-cf03-4f6a-ad2b-3464fea2378e",
    "e8e2e68f-197a-4a45-802d-c4ec8c942645",
    "72055cec-156d-481f-b0d3-f2054fbf4cb6",
    "a4ce307d-ec21-4415-bfd9-d9b46475ee77",
    "37360744-8513-461f-94d2-60f42fe7b692",
    "b1f32d3c-daab-43fd-888a-433e955a1b8b",
    "3934f5ed-dbbf-4a1b-85ea-ee231518006a",
    "2ad99dae-f3ac-489b-bc6c-70a067778d3f",
    "548f0d83-d244-4fa0-9c2b-9ac7ae4cdeac",
    "86afd0fc-24ad-4435-aa5e-7872fc40f97b",
    "0a132c65-a293-4046-a9d0-6a38dd6d5e9b",
    "3d448e74-8f29-4419-b8eb-dd69ff8d7c8a",
    "dbf861b4-98f0-487a-8ecb-714d95584454",
    "4154c66d-b4e8-4796-ae0f-490eb3bcdf36",
    "266aa7ed-a527-4c3f-9167-4413e838d05d",
    "1c937e19-44c3-4625-a220-b21093f698cc",
    "859d8dee-8117-4ab6-837b-56933be915bf",
    "310e5578-f135-4aab-a06e-cf2c4b9cfcd8",
    "50053e34-71df-4b6a-8254-e8286812b94f",
    "af08255c-cb10-482c-acbb-4333e480ef05",
    "bcdf9e63-6d22-42d1-9fd3-8194d19dbb48",
    "e26a1492-255c-4a11-8de1-28c17edc0286",
    "220b0baf-db67-455b-a930-6bb522364552",
    "cacfe954-66a3-4f39-ba02-0acd3d124b3e",
    "b20a9a10-97fc-41ab-b1f8-b803ef91e944",
    "af2ab8e6-0dba-4631-93ed-893526168cb0",
    "4fce28b8-0c3d-4393-aa2f-eeb23c0e270e",
    "288e5c4a-e982-4ed4-94de-ad54425dbce4",
    "25054b15-86fa-4886-a63b-26c9c2a4c2fa",
    "6424a91d-699c-46c5-b8cf-81484fc410d5",
    "2fe3a322-8247-48a4-8542-5b7f18d48c85",
    "c3580144-78b3-4141-b428-e2ee40c17484",
    "2081059e-aed1-4c08-8228-3507dfaeb4d3",
    "de4e1825-6b89-4530-8d1c-35523f71a918",
    "634af5cd-cbba-42d7-877b-4394916f11ea",
    "d5dab5ad-7531-4cf4-ab8f-63bedbf5537a",
    "9dc53eaf-672c-46a7-a968-6246545e085c",
    "04a76108-bfbe-474e-ab09-cca05e63aa50",
    "2e627869-9b52-4e55-9052-66649027c3ae",
    "89821c9c-1447-490a-b198-dbbdfc346686",
    "8e6f680a-ab84-4960-a4a7-8292e276d42f",
    "f6436b47-13ca-4202-8d34-c3dd85e5cecf",
    "5ca3de78-6116-4bc7-9568-c35af55b784a",
    "b84ce78b-6af3-4594-9f19-f8615a8ebac7",
    "24022584-ab57-4a36-9182-b0d8d0f37547",
    "f240b3a6-76b7-4fb7-9fac-ed568e2c8f37",
    "c93329f2-69b5-4ef4-b7ff-e34005315ef5",
    "47bb6128-2803-45a6-8e6d-2411a23522e9",
    "f3b83587-1c20-46f1-a9b2-4ffd8cff09c2",
    "af3a3080-ad3d-47f5-b049-2b9ee3031290",
    "1da87c49-3263-44c9-9288-4f6534908291",
    "9ab0de7f-a23c-4d93-a800-fbc76cd16bbc",
    "2cb8e1d1-2af2-4eef-bdf4-46548e5449e3",
    "7cd162b0-aa49-4ade-9ab1-5b431d46d0b5",
    "2a8cd67b-a969-4cb7-a435-af3d958189d4",
    "6f3ea329-105d-4f13-b084-2e15dca0edfe",
    "64eb7a6b-a9f2-46f0-b3ba-fe451da2a6da",
    "91293787-9470-4caf-86b4-b17e2d3c20e9",
    "03f4a0c6-f26e-4082-8664-aa2c2b103526",
    "556a4861-e528-451f-80a3-3fea8e0784e2",
    "d00ed8c7-d1e6-4c2e-a8d6-6b5d29600e2d",
    "9c121079-e380-4dc7-846d-b9f9073cf3e9",
    "d1864c35-433b-414b-bd33-4f705fa34afb",
    "06784741-e0d2-4933-ad9b-f6f4805ca071",
    "2003d88d-fd5e-41fb-ba28-b078d9483d36",
    "ea4d63b0-5949-447f-9331-83022aec9c77",
    "4cd3b4c4-2650-4ec1-aaf6-cd59ddbd4653",
    "58f25516-af9b-4ecb-9652-661c140b1123",
    "ff96cfe4-a454-4215-8ec5-3fcad2191138",
    "ea9b133a-3e8f-4c98-afdb-0bf86705ad36",
    "3994efe3-ba59-4083-9a27-18a518ed5df9",
    "3a12ec70-2ca9-4a90-b7ff-2dbf8e9ea674",
    "897683c2-394b-455b-b66a-ffb237d06fcf",
    "787cf426-12c9-424d-a6f0-095cbfe35a5a",
    "b328e627-c319-489a-b39a-27a889759768",
    "76293db8-de6d-4cee-bbac-ad68eee39b1a",
    "6ab4a09d-f311-429a-a02d-413a6bb4bfde",
    "9169470a-40ba-4b2d-aecd-fc4a494faa37",
    "77269756-c916-4dbc-b497-6c19a362ea83",
    "f2547711-56e2-4a68-8292-6cfb633aa163",
    "2171e3cc-ccbc-43a7-b0fc-5bdaf1f719a9",
    "82d5c70b-5d7d-4661-a14b-569e270fccaa",
    "f4bcab89-853f-4fd7-b9e5-a759af91dc70",
    "dcfd1991-3cbf-485a-ac75-77ecece8f2da",
    "425d5778-1d54-4294-a963-42a5cafbc5b4",
    "7f28429e-d57d-4ec2-b08e-9ce81deff5f4",
    "61542ccb-5178-4e17-bc55-00400f540f70",
    "9b3703be-9b07-4d0e-aaaf-5e851b831355",
    "c897604e-b47d-495e-b2bd-133d2656183f",
    "2db5fd04-cf02-4684-921c-899fce999eb9",
    "d80dc7ea-7f21-4f9b-9362-d9e43eac1508",
    "604553fd-674e-4f21-acf8-708fabdeba5e",
    "9bfddd8b-b174-4cee-a6e9-eb5fa86bbf01",
    "af9ad518-3aa3-4fec-9f40-54c5209a2e04",
    "2133a0b1-a6a5-453a-a1fd-de5d4ff4dffe",
    "e58e701d-3049-4962-a717-02b2298404a4",
    "43cc7f80-d4f6-4cc4-bbe0-c84c7dfe1ac5",
    "d3c76168-625a-4715-a204-b1792f1ee391",
    "640fd86b-aa63-4923-ac33-e407db9b8bb7",
    "a0984e63-7bfc-483a-b69f-6afe3b0180bd",
    "0cd03dcc-79a1-43f6-b601-f449cf9b76e0",
    "fcf74389-25ba-43f8-bf59-b5c2f36d2ac3",
    "91856efb-a5f8-4cc5-83d1-aac11dceab0c",
    "6aaad7c0-c557-4af0-bc83-9372cf0d8c94",
    "f58a2a44-186b-4534-a464-6a8663011814",
    "19813622-1f47-48eb-bc96-8b9799e6d357",
    "96c2ebe1-874a-49ec-ae13-bd35008af4d3",
    "57fe5b75-54df-4d9e-a506-813a124145c1",
    "594b4a6b-faaf-4637-a01e-7793a6bc9aed",
    "dec1f1ec-a8b1-444e-a9e1-46aaf96de30e",
    "dac4ff93-e12e-40fc-a275-eb11899bbf06",
    "44aaf186-cc51-4b24-a390-6785ea89e1d1",
    "4e36b85a-6761-421a-adc1-9c1c8101e0e2",
    "b6681634-3f62-4b82-8ed2-20fa960a86ff",
    "b916a68f-4de6-431c-9c66-6bcc43e17c87",
    "3694c45b-5fec-4745-90a2-d85009e80619",
    "42236133-8887-48c4-8d61-7b3555db536d",
    "6ed5d4ac-7343-40b0-8ec6-a6811b6551c0",
    "a709c7c8-e55c-48bf-89a5-88717643df1f",
    "bf6bf575-b58c-4064-a66f-7a13ef8bcc90",
    "1ae8098c-1b6b-42e1-a45b-3e12108946cd",
    "49b7075c-ccc6-4ecb-a112-1be138928770",
    "06808521-31ea-46cb-b3a1-8855d1351b22",
    "59a91688-ead9-4f77-8ae6-42d0104dc2c7",
    "e229d635-b9f2-4709-94e5-7be6632c054b",
    "50620afc-b7ef-4963-8af9-3cab9a54cf1e",
    "02de0eae-bf61-45e8-9d82-b4fce6adb191",
    "852f4a30-fa6c-4b13-ade8-eb612bb19b34",
    "bb455a41-61e8-44a3-ba9f-8fc8022ee9bf",
    "2ac1387c-9b74-48fd-b030-a345e0e5031c",
    "d701a08f-d210-4108-a87e-96905cbe2a26",
    "ab07b462-c509-4c1b-bf51-95a68222b4db",
    "9da2324a-8811-42a0-ad3b-42961fd00892",
    "7fc81252-400d-48be-84a7-6c0733167715",
    "a523fe80-fc66-4dbd-ae0e-bd13fda630e9",
    "7268d070-1f08-4c08-8621-9f20554650f6",
    "629bce51-b9af-4689-9baa-11ddfab42550",
    "0b8f4d54-d23a-4b90-a0af-048d7d683224",
    "a21a3085-38bd-4316-a3fa-4552ed77e6aa",
    "db21d4f2-1175-4538-b117-b0748d2ad3d7",
    "f30106d4-a738-4f10-a289-50dd9b2b0bcb",
    "f62c5365-081c-425a-a638-b2e5cf925470",
    "82b42bb0-216e-4364-ab05-9ef82f2bbcfe",
    "ce7f6e3e-1018-4615-a46e-5803e4213727",
    "880fa6b2-f46a-4f4d-989c-2ff004b3a57b",
    "f88d6f8f-2931-413b-b198-92659f1e7de0",
    "69101e93-d2a4-4ced-a49b-8dc8458f8c9c",
    "05908f0e-be3e-4e09-8a5c-b40e97c34022",
    "4762f581-2dd8-456f-ac66-78a989065c64",
    "e1ca8218-89cc-437c-9c69-645a629714e3",
    "99999868-2303-41ce-807d-968d82f8dc98",
    "75f93824-ddfe-4b96-8263-ba4be518e818",
    "d2eb0a40-76eb-4d14-b6ef-258e23480d9a",
    "5b7b2dc5-19b1-4ed9-a2c8-139b4daefe23",
    "55cc373a-1bed-4344-8597-c5676274db5e",
    "fb0d1f8d-ab6a-4bdd-af89-7db3cca5697b",
    "3fe5e7f8-2021-4c40-bdb9-c4f4ceb839c9",
    "ad1ffcce-6696-4544-bdb0-84692d8002f0",
    "afe3a45a-9351-4fa7-934a-78fffaf44739",
    "2dca9384-d218-4311-be38-a3a99e44b9c2",
    "81550358-a123-47ca-a0e3-57de352d9eaa",
    "159edd9b-e29e-4539-b7a0-fe7102c85900",
    "605bf85d-2646-4b93-87a3-23b29ba1d00f",
    "94d25d11-507a-4813-a3d4-5a9c671de4ff",
    "e0e9a657-5b00-4c58-9437-e9eed0d7a0b1",
    "12eb6012-bfe6-45c4-b9e2-3022d157df23",
    "fae1b25b-a53c-4cbb-8870-c9ee0cd50d71",
    "5b25e30c-00ff-4998-a43e-aaebcf6edf81",
    "d56dcc47-acca-4825-a037-382ae7a40b2c",
    "6a675d6e-90f3-4aab-b9e3-8acd1d27af86",
    "d3485565-bc72-4c7f-86de-73b5f5e77b7d",
    "1e2a850a-e6f7-40c5-86aa-adf6744188be",
    "fa13058d-c929-4c9d-887a-699bbb9db0f7",
    "7d8f71a5-699a-4449-ac78-3f83e47c61bc",
    "33df92d2-25c8-478d-99cf-b9a07dde392c",
    "77b739f5-1017-4a76-910e-bb2117349a4b",
    "299a371c-b4c1-4990-b7d7-b4f409aa3464",
    "c7058394-6099-41d0-b25b-68b58d137415",
    "d38c58ab-0fef-457f-a4cf-8ba63fc7dfc9",
    "b9d80d44-cadb-43c5-8780-be4798dad93d",
    "a6eeb8bb-e005-4f3a-878c-c271680290f2",
    "64cd3389-b89f-4aed-b4c6-63abfcdbfd0d",
    "211be56f-4c86-46a9-a38b-e722919f1e29",
    "ab707f10-0cc3-43d0-ab1a-749540839420",
    "6ac8020c-4c81-4861-bc7b-516ef1aa95e3",
    "14363de1-c7dd-49f2-9a46-d3c7ab3bfe06",
    "1e2f7731-d8d4-4e3d-9496-c5afc83509c9",
    "fc731984-ea1d-4602-9dcf-fd066a9ac536",
    "cf4b673f-b426-4bf3-a6db-b87b8c0cb308",
    "e29f45af-66c0-4b4e-8d79-e9ebb4620df3",
    "cba4c527-a657-4b6c-85e1-1b01cb90524f",
    "255fb476-a130-466e-bb6c-83b9042c0cce",
    "89520de2-9107-490c-b44c-59bcc9792066",
    "7099e63b-1aef-4755-85ed-9fd0967f57d2",
    "f0f70dcd-e46a-449e-b4f3-f0631e09d0ea",
    "8b10b7b2-e3b9-4dda-909e-302f2fcc74c2",
    "51a37dab-1c16-4edd-8e00-5cbe9e6d4a58",
    "be287977-b897-4b9b-b6da-09ce95351efa",
    "963724bf-aca3-4bee-9bf8-279012652df3",
    "12761923-1409-4491-a269-f86ce489d4fb",
    "6f386f6b-1691-4891-b476-6f76208ab2f9",
    "673ccb60-f33f-4e1f-82ec-8ff66e9f1da1",
    "90b5fa01-e1a3-4a6a-a8c7-0139680385c6",
    "b34fdd36-3a73-450d-af8b-3e6e00e4f82b",
    "44030e29-9866-4286-828a-1e41d27bf83f",
    "d15283f4-766e-495a-8b38-a22c59e341a4",
    "6a16d47f-9f8b-41c2-a9c6-c327408cab29",
    "fd0c25a0-9d03-4da3-98ec-d5f6f53fbedd",
    "2080ca55-4b08-461b-94d4-87296ffb72d8",
    "5c58ab04-6419-4160-bc9a-49884b68daee",
    "3a8da65b-7336-4be8-8606-80e19f70d992",
    "d3fd0c91-264a-4166-9581-5cee3d0f87c0",
    "065bb522-a5d9-4767-855d-d809858b4319",
    "7d5d5b3b-50ec-446b-89e1-3296697b3d11",
    "38583b1c-0c81-485c-9e2e-54e937ae3fa1",
    "e717709a-6740-4d77-b367-468f3a85d641",
    "588a096a-f256-41a5-9225-718d54882358",
    "91da1533-2e07-44fc-b73f-0801bda127aa",
    "47750e8d-ad04-4d5b-8faa-d656aabc182a",
    "93e87783-87e6-44df-bd98-8208c7d365db",
    "f0aa30d9-8f95-4263-920d-e557c5622873",
    "13e378ae-e81e-4042-a9f3-67c465461bb8",
    "03c206d5-072f-45b6-bb48-7fe3017e6fc7",
    "ba3f7953-16d3-45f0-bf03-4df67df67f27",
    "f4d91a6a-a12a-4244-80ae-7942016b9568",
    "84558ccb-113d-4312-8670-5318399a2e9a",
    "ded0607e-f076-4671-ada5-f22b3d46636c",
    "8ea775e9-7745-48ba-8586-b11539978fdb",
    "8846464e-eb3d-49f1-a5e5-f0c24df77e95",
    "a1f43b36-a706-4e5a-8859-c25bc36f6304",
    "6e9a0f54-ea50-4bb6-a6d5-fc7d364962d7",
    "c41e6623-f866-49e8-9b11-7ad6a1898caf",
    "4f9f3d4e-498f-404e-936c-77a1a2cab150",
    "f17ce8c6-b66f-49eb-8336-0c7201feeb82",
    "8e0c6bb4-db23-4b46-ac4d-2079d7ca063a",
    "722261ab-beed-426a-817d-20063bda83d5"
]
let addCs = async function (user) {
    try {
        for (let i = 0; i < 100; i++) {
            var userID1 = ""
            var lati = faker.address.latitude()
            var long = faker.address.longitude()
            var phoneNumber = faker.phone.phoneNumber()
            var open = "11:00:00"
            var close = "24:00:00"
            var cost = "1520"
            userID1 = user[i]
            // // console.log(userID1, lati, long, phoneNumber, open, close, cost)
            // // check in charging station exist or not
            // const chargingStation = await pool.query("SELECT * FROM charging_station WHERE cs_longitude = $1 AND cs_latitude =$2", [long, lati]);
            // if (chargingStation.rows.length << 0) {
            //     console.log("Charging Station Already Exist")
            //     return "Charging Station Already Exist";
            // } else {
            //     const newCS = await pool.query("INSERT INTO charging_station(cs_phone,cs_openat,cs_closeat,cs_longitude,cs_latitude,cs_cost,user_id) VALUES($1,$2,$3,$4,$5,$6,$7) ", [phoneNumber, open, close, long, lati, cost, userID1]);
            //     const oc = await pool.query("UPDATE users SET cs_status = true WHERE user_id = $1 ", [userID1])
            // }
            const deleteCS = await pool.query("DELETE FROM charging_station WHERE cs_phone =$1 RETURNING user_id ", [userID1]);
            // res.json("DELETED SUCCESSFULLY")
            console.log(deleteCS.rows[0].user_id)
            userID2 = deleteCS.rows[0].user_id
            const csstatus = await pool.query("UPDATE users SET cs_status = false WHERE user_id = $1 RETURNING cs_status", [userID2])
            console.log(csstatus.rows[0].cs_status)
        }
        console.log("completed")
    } catch (err) {
        console.log(err.message, "server error");
    }
}

let phone1 = [
    
    "8227821757",
    "7318796387"


]



addCs(phone1);

