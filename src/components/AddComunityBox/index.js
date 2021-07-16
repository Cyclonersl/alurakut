import DatoApi from "../../api/DatoApi";
import Box from "../Box";

export const AddComunityBox = ({ githubUser, updateCommunities }) => {
  const handlerAddCommunity = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    DatoApi.addCommunity({
      title: form.get("title"),
      imageUrl: form.get("image"),
      username: githubUser,
    }).then((res) => {
      updateCommunities(res);
      document.getElementById("addComunityForm").reset();
    });
  };

  return (
    <Box>
      <h2 className="subTitle ">O que você deseja fazer?</h2>
      <form id="addComunityForm" onSubmit={handlerAddCommunity}>
        <div>
          <input
            placeholder="Qual vai ser o nome da sua comunidade?"
            name="title"
            aria-label="Qual vai ser o nome da sua comunidade?"
          />
        </div>
        <div>
          <input
            placeholder="Coloque uma URL para usarmos de capa"
            name="image"
            aria-label="Coloque uma URL para usarmos de capa"
          />
        </div>
        <div>
          <button>Criar comunidade</button>
        </div>
      </form>
    </Box>
  );
};
