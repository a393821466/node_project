let group = {
  0: 'user',
  1: 'administrators',
  2: 'admin',
  3: 'lecturer',
  4: 'assistant',
  5: 'vip1',
  6: 'vip2',
  7: 'vip3',
  8: 'vip4',
  9: 'vip5',
  10: 'vip6',
  11: 'vip7',
  12: 'tourist'
}
//双向设置
for (const prop in group) {
  const value = group[prop]
  group[value] = Number(prop)
}