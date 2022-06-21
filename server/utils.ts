type Entity = []

type Paginate = {
  entity: Entity
  page: number
  perPage: number
}

export type DataPaginated<T> = {
  pagination: {
    page: number
    perPage: number
    totalItems: number
    totalPages: number
  }

  data: Array<T>
}

export const paginate = ({ entity, page = 1, perPage = 1 }: Paginate): DataPaginated<Entity> => {
  const start = (page - 1) * perPage
  const end = start + perPage

  return {
    pagination: {
      page,
      perPage,
      totalItems: entity.length,
      totalPages: Math.ceil(entity.length / perPage),
    },

    data: entity.slice(start, end),
  }
}

export const transformInNumberOrFallback = (value, fallback) => {
  if (value) {
    const parsed = Number(value)

    return Number.isNaN(parsed) ? fallback : parsed
  }
  return fallback
}

export const randomNumber = (quantity: number, arrayPosition: boolean): number => {
  const startInZero = arrayPosition ? 0 : 1
  return Math.floor(Math.random() * quantity) + startInZero
}

export const randomFloat = (quantity: number, precision = 3): number => {
  const integer = Math.floor(Math.random() * quantity)
  const part = +(Math.random() * quantity).toPrecision(precision)
  return integer + part
}

export const randomMinMaxNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min)) + min
}
