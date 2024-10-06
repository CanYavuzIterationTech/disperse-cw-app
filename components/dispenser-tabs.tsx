import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CW20Dispenser } from "@/components/cw20-dispenser";
import { NativeDispenser } from "@/components/native-dispenser";

export const DispenserTabs = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-8">
        <h1 className="text-4xl">Dispenser Test App</h1>
        
      <div className="w-full flex justify-center items-center">
        <Tabs defaultValue="native" className="w-full max-w-2xl">
          <TabsList className="w-full">
            <TabsTrigger value="native" className="w-full">
              Native
            </TabsTrigger>
            <TabsTrigger value="cw20" className="w-full">
              CW20
            </TabsTrigger>
          </TabsList>
          <TabsContent value="native">
            <NativeDispenser />
          </TabsContent>
          <TabsContent value="cw20">
            <CW20Dispenser />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
