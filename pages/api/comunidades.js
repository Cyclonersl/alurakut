import { SiteClient } from "datocms-client";

export default async function recebedorDeRequest(request, response) {
  const READ_TOKEN = "e03a077df8a44c6c0167e971d5c85c";
  const EDIT_TOKEN = "d9d47004d2540a4489c04259988dc8";
  const DATO_BASE_URL_API = "https://graphql.datocms.com";

  //Create
  if (request.method === "POST") {
    const client = new SiteClient(EDIT_TOKEN);
    const record = await client.items.create({
      itemType: "972631",
      ...request.body,
    });

    response.json(record);
    return;
  }

  //Select
  if (request.method === "GET") {
    const records = await fetch(DATO_BASE_URL_API, {
      method: "POST",
      headers: {
        authorization: READ_TOKEN,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: ` query {
                      allComunities {
                          id
                          title
                          imageUrl
                          creatorslug
                        }
                  }
                  `,
      }),
    });
    const json = await records.json();
    response.json(json);
    return;
  }

  //Another Methods
  response.status(404).json({ message: "Only POST Request Accepted." });
}
