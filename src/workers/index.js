import TestWorker from 'worker-loader!./test.worker'

import { getMessagePort } from "@/workers/utils";

const W = new TestWorker
const CW = getMessagePort(W)
