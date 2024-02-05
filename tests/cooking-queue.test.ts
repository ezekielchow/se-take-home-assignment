import App from '@/app.vue'
import { createPinia } from 'pinia'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createApp } from 'vue'
import { getCompletedOrders } from '~/services/bots'
import { updateCookingStatus } from '~/services/queue'
import { useBotsStore } from '~/store/bots'
import { useNormalQueueStore } from '~/store/normal_queue'
import { useOperationStore } from '~/store/operation'
import { useVIPQueueStore } from '~/store/vip_queue'
import { Bot, BotStatusEnum, OrderStatusEnum, OrderTypeEnum } from '~/types'

const setup = () => {
  const pinia = createPinia()
  const app = createApp(App)
  app.use(pinia)

  useBotsStore().$reset()
  useNormalQueueStore().$reset()
  useVIPQueueStore().$reset()
}

describe('Cooking Queue', () => {
  beforeEach(() => {
    setup()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should add bot to when add bots clicked', () => {
    setup()

    const bs = useBotsStore()
    expect(bs.botCount).toBe(0)

    const botsToAdd: Array<Bot> = [
      {
        id: 0,
        status: BotStatusEnum.IDLE
      },
      {
        id: 1,
        status: BotStatusEnum.IDLE
      }
    ]

    for (let i = 0; i < botsToAdd.length; i++) {
      const newBot = botsToAdd[i]

      bs.addBot(newBot)
      expect(bs.botCount).toBe(i + 1)
    }
  })

  it('should remove last added bot when remove bot clicked', () => {
    setup()

    const bs = useBotsStore()

    const botsToAdd: Array<Bot> = [
      {
        id: 0,
        status: BotStatusEnum.IDLE
      },
      {
        id: 1,
        status: BotStatusEnum.IDLE
      }
    ]

    for (let i = 0; i < botsToAdd.length; i++) {
      const newBot = botsToAdd[i]

      bs.addBot(newBot)
    }

    expect(bs.botCount).toBe(2)

    bs.bots.pop()

    expect(bs.botCount).toBe(1)
    expect(bs.bots[0].id).toBe(0)
  })

  it('should add normal order to normal queue on new normal order clicked', () => {
    setup()

    const nqs = useNormalQueueStore()
    expect(nqs.queueLength).toBe(0)

    nqs.addOrder({
      id: 1,
      status: OrderStatusEnum.PENDING,
      name: 'test',
      type: OrderTypeEnum.NORMAL
    })
    expect(nqs.queueLength).toBe(1)
    expect(nqs.queue[0].id).toBe(1)
    expect(nqs.queue[0].bot).toBe(undefined)
    expect(nqs.queue[0].status).toBe(OrderStatusEnum.PENDING)
    expect(nqs.queue[0].name).toBe('test')
    expect(nqs.queue[0].type).toBe(OrderTypeEnum.NORMAL)

    const vqs = useVIPQueueStore()
    expect(vqs.queueLength).toBe(0)
  })

  it('should add vip order to vip queue on new vip order clicked', () => {
    setup()

    const vqs = useVIPQueueStore()
    expect(vqs.queueLength).toBe(0)

    vqs.addOrder({
      id: 1,
      status: OrderStatusEnum.PENDING,
      name: 'test',
      type: OrderTypeEnum.VIP
    })
    expect(vqs.queueLength).toBe(1)
    expect(vqs.queue[0].id).toBe(1)
    expect(vqs.queue[0].bot).toBe(undefined)
    expect(vqs.queue[0].status).toBe(OrderStatusEnum.PENDING)
    expect(vqs.queue[0].name).toBe('test')
    expect(vqs.queue[0].type).toBe(OrderTypeEnum.VIP)

    const nqs = useNormalQueueStore()
    expect(nqs.queueLength).toBe(0)
  })

  it('earliest bot should pickup order from the vip store first if theres a VIP & Normal order', () => {
    setup()

    const vqs = useVIPQueueStore()
    expect(vqs.queueLength).toBe(0)

    vqs.addOrder({
      id: 1,
      status: OrderStatusEnum.PENDING,
      name: 'VIP',
      type: OrderTypeEnum.VIP
    })
    expect(vqs.queueLength).toBe(1)

    const nqs = useNormalQueueStore()
    expect(nqs.queueLength).toBe(0)

    nqs.addOrder({
      id: 1,
      status: OrderStatusEnum.PENDING,
      name: 'NORMAL',
      type: OrderTypeEnum.NORMAL
    })
    expect(nqs.queueLength).toBe(1)

    const bs = useBotsStore()
    bs.addBot({ id: 1, status: BotStatusEnum.IDLE })
    bs.addBot({ id: 2, status: BotStatusEnum.IDLE })

    updateCookingStatus()

    expect(bs.bots[0].status).toBe(BotStatusEnum.COOKING)
    expect(bs.bots[0].order?.name).toBe('VIP')
    expect(bs.bots[0].order?.type).toBe(OrderTypeEnum.VIP)

    expect(bs.bots[1].status).toBe(BotStatusEnum.COOKING)
    expect(bs.bots[1].order?.name).toBe('NORMAL')
    expect(bs.bots[1].order?.type).toBe(OrderTypeEnum.NORMAL)

    expect(vqs.queue[0].status).toBe(OrderStatusEnum.COOKING)
    expect(vqs.queue[0].bot?.id).toBe(1)
  })

  it('earliest bot should pickup order from the normal store first if theres a Normal order but no VIP Order', () => {
    setup()

    const nqs = useNormalQueueStore()
    expect(nqs.queueLength).toBe(0)

    nqs.addOrder({
      id: 1,
      status: OrderStatusEnum.PENDING,
      name: 'test',
      type: OrderTypeEnum.NORMAL
    })
    expect(nqs.queueLength).toBe(1)

    const vqs = useVIPQueueStore()
    expect(vqs.queueLength).toBe(0)

    const bs = useBotsStore()
    bs.addBot({ id: 1, status: BotStatusEnum.IDLE })
    bs.addBot({ id: 2, status: BotStatusEnum.IDLE })

    updateCookingStatus()

    expect(bs.bots[0].status).toBe(BotStatusEnum.COOKING)
    expect(bs.bots[1].status).toBe(BotStatusEnum.IDLE)
    expect(nqs.queue[0].status).toBe(OrderStatusEnum.COOKING)
    expect(nqs.queue[0].bot?.id).toBe(1)
  })

  it('earliest bot should pickup order from the VIP store first if theres a VIP order but no Normal order', () => {
    setup()

    const vqs = useVIPQueueStore()
    expect(vqs.queueLength).toBe(0)

    vqs.addOrder({
      id: 1,
      status: OrderStatusEnum.PENDING,
      name: 'test',
      type: OrderTypeEnum.VIP
    })
    expect(vqs.queueLength).toBe(1)

    const nqs = useNormalQueueStore()
    expect(nqs.queueLength).toBe(0)

    const bs = useBotsStore()
    bs.addBot({ id: 1, status: BotStatusEnum.IDLE })
    bs.addBot({ id: 2, status: BotStatusEnum.IDLE })

    updateCookingStatus()

    expect(bs.bots[0].status).toBe(BotStatusEnum.COOKING)
    expect(bs.bots[1].status).toBe(BotStatusEnum.IDLE)
    expect(vqs.queue[0].status).toBe(OrderStatusEnum.COOKING)
    expect(vqs.queue[0].bot?.id).toBe(1)
  })

  it('latest bot should be move to idle with order back to pending if halfway cooking & bots number decrease', () => {
    setup()

    const vqs = useVIPQueueStore()
    expect(vqs.queueLength).toBe(0)

    vqs.addOrder({
      id: 1,
      status: OrderStatusEnum.PENDING,
      name: 'test',
      type: OrderTypeEnum.VIP
    })
    expect(vqs.queueLength).toBe(1)

    const bs = useBotsStore()
    bs.addBot({ id: 1, status: BotStatusEnum.IDLE })

    updateCookingStatus()

    expect(bs.bots[0].status).toBe(BotStatusEnum.COOKING)
    expect(bs.bots[0].order?.id).toBe(1)
    expect(bs.bots[0].timer).toBeDefined()
    expect(vqs.queue[0].status).toBe(OrderStatusEnum.COOKING)
    expect(vqs.queue[0].bot?.id).toBe(1)

    bs.removeBot()

    // Could be improve, find a way to test clearTimeout

    expect(bs.botCount).toBe(0)
    expect(vqs.queue[0].status).toBe(OrderStatusEnum.PENDING)
    expect(vqs.queue[0].bot).toBeUndefined()
  })

  it('should change cooking status to done after 10 seconds', () => {
    setup()

    const vqs = useVIPQueueStore()
    expect(vqs.queueLength).toBe(0)

    vqs.addOrder({
      id: 1,
      status: OrderStatusEnum.PENDING,
      name: 'test',
      type: OrderTypeEnum.VIP
    })
    expect(vqs.queueLength).toBe(1)

    const bs = useBotsStore()
    bs.addBot({ id: 1, status: BotStatusEnum.IDLE })

    updateCookingStatus()

    expect(bs.bots[0].status).toBe(BotStatusEnum.COOKING)
    expect(vqs.queue[0].status).toBe(OrderStatusEnum.COOKING)

    console.log(process.env.TIME_PER_ORDER_MILLISECONDS)

    vi.advanceTimersByTime(Number(process.env.TIME_PER_ORDER_MILLISECONDS))

    expect(bs.bots[0].status).toBe(BotStatusEnum.IDLE)
    expect(bs.bots[0].order).toBeUndefined()
    expect(vqs.queue[0].status).toBe(OrderStatusEnum.COOKED)
  })

  it("cooking status should not change if it's below 10 seconds", () => {
    setup()

    const vqs = useVIPQueueStore()
    expect(vqs.queueLength).toBe(0)

    vqs.addOrder({
      id: 1,
      status: OrderStatusEnum.PENDING,
      name: 'test',
      type: OrderTypeEnum.VIP
    })
    expect(vqs.queueLength).toBe(1)

    const bs = useBotsStore()
    bs.addBot({ id: 1, status: BotStatusEnum.IDLE })

    updateCookingStatus()

    expect(bs.bots[0].status).toBe(BotStatusEnum.COOKING)
    expect(vqs.queue[0].status).toBe(OrderStatusEnum.COOKING)

    vi.advanceTimersByTime(Number(process.env.TIME_PER_ORDER_MILLISECONDS) / 2)

    expect(bs.bots[0].status).toBe(BotStatusEnum.COOKING)
    expect(vqs.queue[0].status).toBe(OrderStatusEnum.COOKING)

    vi.advanceTimersByTime(Number(process.env.TIME_PER_ORDER_MILLISECONDS) / 2)

    expect(bs.bots[0].status).toBe(BotStatusEnum.IDLE)
    expect(bs.bots[0].order).toBeUndefined()
    expect(vqs.queue[0].status).toBe(OrderStatusEnum.COOKED)
  })

  it('should get correct number of completed orders for bot', () => {
    setup()

    const vqs = useVIPQueueStore()
    expect(vqs.queueLength).toBe(0)

    vqs.addOrder({
      id: 1,
      status: OrderStatusEnum.PENDING,
      name: 'test',
      type: OrderTypeEnum.VIP
    })
    expect(vqs.queueLength).toBe(1)

    const bs = useBotsStore()
    bs.addBot({ id: 1, status: BotStatusEnum.IDLE })

    updateCookingStatus()

    expect(bs.bots[0].status).toBe(BotStatusEnum.COOKING)
    expect(vqs.queue[0].status).toBe(OrderStatusEnum.COOKING)

    vi.advanceTimersByTime(Number(process.env.TIME_PER_ORDER_MILLISECONDS))

    expect(bs.bots[0].status).toBe(BotStatusEnum.IDLE)
    expect(bs.bots[0].order).toBeUndefined()
    expect(vqs.queue[0].status).toBe(OrderStatusEnum.COOKED)

    expect(getCompletedOrders(bs.bots[0]).length).toBe(1)
  })

  it('should test if starting & pausing operation works', () => {
    setup()

    const os = useOperationStore()
    os.startOperation()

    const vqs = useVIPQueueStore()
    expect(vqs.queueLength).toBe(0)

    vqs.addOrder({
      id: 1,
      status: OrderStatusEnum.PENDING,
      name: 'test',
      type: OrderTypeEnum.VIP
    })
    vqs.addOrder({
      id: 2,
      status: OrderStatusEnum.PENDING,
      name: 'test',
      type: OrderTypeEnum.VIP
    })
    expect(vqs.queueLength).toBe(2)

    const bs = useBotsStore()
    bs.addBot({ id: 1, status: BotStatusEnum.IDLE })

    updateCookingStatus()

    expect(bs.bots[0].status).toBe(BotStatusEnum.COOKING)
    expect(vqs.queue[0].status).toBe(OrderStatusEnum.COOKING)
    expect(vqs.queue[1].status).toBe(OrderStatusEnum.PENDING)

    os.stopOperation()

    vi.advanceTimersByTime(
      Number(process.env.TIME_PER_ORDER_MILLISECONDS) + 1000
    )

    expect(bs.bots[0].status).toBe(BotStatusEnum.IDLE)
    expect(bs.bots[0].order).toBeUndefined()
    expect(vqs.queue[0].status).toBe(OrderStatusEnum.COOKED)
    expect(vqs.queue[1].status).toBe(OrderStatusEnum.PENDING)
  })
})
