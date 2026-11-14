export function normalizeMaterialType(value) {
  return String(value ?? '').trim().toLowerCase()
}

export function scoreMaterialMatch(need, available) {
  const typeMatches = normalizeMaterialType(need.type) === normalizeMaterialType(available.type)
  const conditionMatches = !need.condition || need.condition === available.condition
  const quantity = Number(available.quantity ?? 0)
  const requiredQuantity = Number(need.quantity ?? 0)
  const quantityMatches = quantity >= requiredQuantity

  return {
    score: [typeMatches, conditionMatches, quantityMatches].filter(Boolean).length * 100 / 3,
    reasons: {
      type: typeMatches,
      condition: conditionMatches,
      quantity: quantityMatches,
    },
  }
}
