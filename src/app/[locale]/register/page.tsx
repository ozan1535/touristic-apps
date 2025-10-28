import Login from "@/components/Login/Login";
import { getTranslations } from "next-intl/server";

async function page() {
  const signInTranslation = await getTranslations("SignUp");

  return (
    <Login
      text1={signInTranslation("create")}
      text2={signInTranslation("createForFree")}
      text3={signInTranslation("alreadyHave")}
      text4={signInTranslation("login")}
      link="/sign-in"
      kindeMode={"register"}
    />
  );
}

export default page;
