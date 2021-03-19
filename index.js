// TOKEN_MAX_WIDTH and TOKEN_MAX_HEIGHT = 320
a.width = a.height = 640
// Scale for retina
c.scale(2, 2)
// k = keys
// Entities (n)
k = n = []
// s = score
// t = time
// u = time since spawn
// v = player x velocity
// w = player y velocity
// x = player x
// z = player frame
s = t = u = v = w = x = z = 0
// o = Is player alive?
o = 1
// y = player y
y = 240
// (S)prite
// a = run length encoded string
// x = sprite x
// y = sprite y
// w = width, i.e. rects in row
// s = size of rect
// f = flip?
S = (a, x, y, w, s, f) => {
  // decode string using regex and map over each character
  // (\w)(\d+) would be better IRL, but all of the RLE sprites use single
  // digits so we can save a character
  [...a.replace(/(\w)(\d)/g, (_, q, r) => q.repeat(r))].map((j, i) => {
    // q = column
    q = i % w
    // Get color
    // 'a' = feet
    // 'b' = skin/cross
    // 'c' = body
    // 'd' = hair/ground
    // 'e' = coin
    // 'f' = background
    // 'g' = boulder
    h = '000fed00ff75fd5533976'.match(/.../g)[j.charCodeAt(0) - 97]
    c.fillStyle = '#' + h
    h && c.fillRect(
      // Get x coord for 'pixel'. If f is truthy, flip by rendering
      // right to left
      ~~(x + (f ? w - q - 1 : q) * s),
      // Get y coord for 'pixel' (y + row * s)
      ~~(y + ~~(i / w) * s),
      s,
      s
    )
  })
}
// (T)ick
// e = timestamp
(function T(e) {
  // Calculate delta
  // 1e3 is shorter than 1000
  l = (e - t) / 1e3
  // Update time since last spawn
  u += l
  // Animate sprite at 10fps
  // 10 * (e - t) / 1e3 becomes (e - t) / 100
  z += (e - t) / 100
  t = e
  // Draw background
  S('f', 0, 0, 1, 320)
  // Draw floor
  S('d', 0, 280, 1, 320)
  // Text will have the same fill as floor
  c.fillText(s, 10, 20)
  // Spawn every nth seconds
  if (u >= 1) {
    n.push({
      x: (0 | Math.random() * 8) * 40,
      y: 0,
      // Set type (0 = coin, 1 = boulder)
      t: 0 | Math.random() * 2,
      // Set direction (left or right)
      d: [-1, 1][0 | Math.random() * 2]
    })
    // Reset time since last spawn
    u = 0
  }
  // Render and update entities
  // IRL reduce would be a better choice, but map and pushing to a temp array
  // is fewer bytes
  f = []
  n.map(e => {
    // Gravity is 160
    e.y += 160 * l
    if (e.y >= 260) {
      e.y = 260
      e.x += 60 * l * e.d
    }
    // IRL we'd want to remove out of bound entities, but that uses up bytes
    // e.g. if (e.x < 320 && e.x > -20)
    // Simple hit detection (also checks if game if player is alive)
    x < e.x + 20 && x + 30 > e.x && y < e.y + 20 && 30 + y > e.y && o
      // Hit, game over if boulder, increment score if coin
      ? e.t ? (f.push(e), o = 0) : s++
      : f.push(e)
    // Draw
    S(e.t ? 'g5eg4eg5' : 'xe2xeb2e2b2exe2', e.x, e.y, 4, 5)
  })
  // Re-assign entities
  n = f
  // Update player
  // Jumping?
  if (o && k[32] && y == 240) {
    w = -120
  }
  // Moving?
  v = o && (k[37] || k[39]) ? k[37] ? -80 : 80 : 0
  // Update y velocity
  // Gravity is 160
  w += 160 * l
  y += w * l
  x += v * l
  // Clamp to bounds (x)
  // if (x > 290) x = 290
  // if (x < 0) x = 0
  x > 290 ? x = 290 : x < 0 ? x = 0 : x
  // Keep player above ground plane (y)
  if (y >= 240) {
    y = 240
    w = 0
  }
  // Draw player
  S(
    [
      'x2d3x3dbx4b3x3bcx4bcx4c2x3ac2x4a2',
      'x2d3x3dbx4b3x3bcx4cbx4c2xaxc3ax2a2',
      'x2d3x3dbx4b3x3bcx3bc2x4c2x2ac4xax2a2',
      // Jumping
      'x3dx4d2x4dbx4b3x3bcx4bcx3c4xa2x2a2',
      // Standing
      'x2d3x3b2x4b2x3bc2bx3bcbx3c2x4c2x4a2',
      // Dead
      'x2b2x4b2x2b9b3x2b2x4b2x4b2x4b2'
    ][
      // Ternary maddness
      // Equivalent to
      // if (o) {
      //   if (w) {
      //     j = 3 // Jumping
      //   }
      //   else if (v) {
      //     j = ~~z % 3 // Walking
      //   }
      //   if (o) {
      //     j = 4 // Standing
      //   }
      // } else {
      //   j = 5
      // }
      o ? w ? 3 : v ? ~~z % 3 : 4 : 5
    ],
    x,
    y,
    6,
    5,
    // v < 0 makes more sense, but k[37] packs better
    k[37]
  )
  requestAnimationFrame(T)
})(0)
// x.type is 'keyup' or 'keydown'
// x.type[5] is undefined on 'keyup'
onkeyup = onkeydown = e => k[e.which] = e.type[5]
