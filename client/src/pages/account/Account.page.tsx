import { Divider } from "@heroui/react";

import { ProfileUpdateContainer } from "@/containers";
import { AppContainer } from "@/components/layout";

export const AccountPage = () => (
  <AppContainer className="pt-12">
    <section className="px-2">
      <ProfileUpdateContainer />
      <Divider />
    </section>
  </AppContainer>
);
