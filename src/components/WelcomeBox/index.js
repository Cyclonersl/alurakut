import { OrkutNostalgicIconSet } from "../../lib/AluraCommons";
import Box from "../Box";

export const WelcomeBox = () => {
  return (
    <Box>
      <h1 className="title">Bem Vindo(a)</h1>
      <OrkutNostalgicIconSet confiavel={3} legal={2} sexy={1} mensagens={5} />
    </Box>
  );
};
