import { Card, CardBody, CardHeader, CardProps } from "@/registry/ui";
import { Image } from "@/registry/ui/image";

export const ComCenterImgTemplate = (args: CardProps) => (
  <Card {...args} className="max-w-fit py-4 px-0">
    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start!">
      <p className="text-xs uppercase font-bold">Daily Mix</p>
      <small className="text-default-500">12 Tracks</small>
      <h4 className="font-bold text-lg">Frontend Radio</h4>
    </CardHeader>
    <CardBody className="overflow-visible py-2">
      <Image isBlurred alt="Card background" src={"https://heroui.com/images/hero-card-complete.jpeg"} width={300} />
    </CardBody>
  </Card>
);
