import mutations from '@/store/mutations.js'

// // 解构 mutations
const { SET_USER, SET_LIST, SET_ITEM,
  SET_CHANGED_INDEX } = mutations

describe('/store/mutations.js', () => {
  it('SET_USER', () => {
    // 模拟状态
    const state = { user: {} }
    // 应用 mutation
    SET_USER(state, { name: 'hehe' })
    // 断言结果
    expect(state.user.name).to.equal('hehe')
  })

  it('SET_LIST', () => {
    // 模拟状态
    const state = { list: [] }
    // 应用 mutation
    SET_LIST(state, [1])
    // 断言结果
    expect(state.list[0]).to.equal(1)
  })

  it('SET_ITEM', () => {
    // 模拟状态
    const state = { list: [{ name: 'haha' }] }
    // 应用 mutation
    SET_ITEM(state, { index: 0, item: { name: 'hehe' } })
    // 断言结果
    expect(state.list[0].name).to.equal('hehe')
  })

  it('SET_CHANGED_INDEX', () => {
    // 模拟状态
    const state = { changedIndex: -1 }
    // 应用 mutation
    SET_CHANGED_INDEX(state, 1)
    // 断言结果
    expect(state.changedIndex).to.equal(1)
  })
})
