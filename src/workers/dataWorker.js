import { SERVICE } from "@/service";
import { initWorkerMessagePort } from "@/workers/utils";

const { temp } = SERVICE,
  tmp = { messagePort: null };

initWorkerMessagePort(self, tmp)