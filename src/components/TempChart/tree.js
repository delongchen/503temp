function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val)
  this.left = (left === undefined ? null : left)
  this.right = (right === undefined ? null : right)
}

const h = (v, l, r) => new TreeNode(v, l, r)
const test =
  h(1,
    h(2,
      h(4,
        h(8),
        h(9)
      ),
      h(5,
        h(10),
        h(11)
      )
    ),
    h(3,
      h(6),
      h(7)
    )
  )

/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
const levelOrder = function (root, f) {
  const q = [root]

  while (q.length) {
    const now = q.pop()
    f(now)
    if (now.left) q.unshift(now.left)
    if (now.right) q.unshift(now.right)
  }
}

function mkt(n) {
  if (n === 0) return null
  const li = new Array(n).fill(null).map((_, i) => i)
  const ret = new TreeNode(li.shift())
  const q = [ret]
  const start = Date.now()
  let size = n - 1

  while (size--) {
    const now = q.pop()
    const newNode = new TreeNode(li.shift())

    if (now[Symbol('l')]) {
      now.right = newNode
      delete now[Symbol('l')]
    } else {
      now.left = newNode
      newNode[Symbol('l')] = true
    }

    q.unshift(newNode)
  }

  console.log(`created ${n}: spend ${(Date.now() - start)} ms`)
  return ret
}

function she() {

}

levelOrder(mkt(120000), () => {
  //console.log(node.val)
})
