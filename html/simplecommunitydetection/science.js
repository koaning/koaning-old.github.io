(function(a) {
    (function(a) {
        science = {
            version: "1.9.1"
        }, science.ascending = function(a, b) {
            return a - b
        }, science.EULER = .5772156649015329, science.expm1 = function(a) {
            return a < 1e-5 && a > -0.00001 ? a + .5 * a * a : Math.exp(a) - 1
        }, science.functor = function(a) {
            return typeof a == "function" ? a : function() {
                return a
            }
        }, science.hypot = function(a, b) {
            a = Math.abs(a), b = Math.abs(b);
            var c, d;
            a > b ? (c = a, d = b) : (c = b, d = a);
            var e = d / c;
            return c * Math.sqrt(1 + e * e)
        }, science.quadratic = function() {
            function b(b, c, d) {
                var e = c * c - 4 * b * d;
                return e > 0 ? (e = Math.sqrt(e) / (2 * b), a ? [{
                    r: -c - e,
                    i: 0
                }, {
                    r: -c + e,
                    i: 0
                }] : [-c - e, -c + e]) : e === 0 ? (e = -c / (2 * b), a ? [{
                    r: e,
                    i: 0
                }] : [e]) : a ? (e = Math.sqrt(-e) / (2 * b), [{
                    r: -c,
                    i: -e
                }, {
                    r: -c,
                    i: e
                }]) : []
            }
            var a = !1;
            return b.complex = function(c) {
                return arguments.length ? (a = c, b) : a
            }, b
        }, science.zeroes = function(a) {
            var b = -1,
                c = [];
            if (arguments.length === 1)
                while (++b < a) c[b] = 0;
            else
                while (++b < a) c[b] = science.zeroes.apply(this, Array.prototype.slice.call(arguments, 1));
            return c
        }
    })(this),
    function(a) {
        function b(a, b, c) {
            var d = c.length;
            for (var e = 0; e < d; e++) a[e] = c[d - 1][e];
            for (var f = d - 1; f > 0; f--) {
                var g = 0,
                    h = 0;
                for (var i = 0; i < f; i++) g += Math.abs(a[i]);
                if (g === 0) {
                    b[f] = a[f - 1];
                    for (var e = 0; e < f; e++) a[e] = c[f - 1][e], c[f][e] = 0, c[e][f] = 0
                } else {
                    for (var i = 0; i < f; i++) a[i] /= g, h += a[i] * a[i];
                    var j = a[f - 1],
                        k = Math.sqrt(h);
                    j > 0 && (k = -k), b[f] = g * k, h -= j * k, a[f - 1] = j - k;
                    for (var e = 0; e < f; e++) b[e] = 0;
                    for (var e = 0; e < f; e++) {
                        j = a[e], c[e][f] = j, k = b[e] + c[e][e] * j;
                        for (var i = e + 1; i <= f - 1; i++) k += c[i][e] * a[i], b[i] += c[i][e] * j;
                        b[e] = k
                    }
                    j = 0;
                    for (var e = 0; e < f; e++) b[e] /= h, j += b[e] * a[e];
                    var l = j / (h + h);
                    for (var e = 0; e < f; e++) b[e] -= l * a[e];
                    for (var e = 0; e < f; e++) {
                        j = a[e], k = b[e];
                        for (var i = e; i <= f - 1; i++) c[i][e] -= j * b[i] + k * a[i];
                        a[e] = c[f - 1][e], c[f][e] = 0
                    }
                }
                a[f] = h
            }
            for (var f = 0; f < d - 1; f++) {
                c[d - 1][f] = c[f][f], c[f][f] = 1;
                var h = a[f + 1];
                if (h != 0) {
                    for (var i = 0; i <= f; i++) a[i] = c[i][f + 1] / h;
                    for (var e = 0; e <= f; e++) {
                        var k = 0;
                        for (var i = 0; i <= f; i++) k += c[i][f + 1] * c[i][e];
                        for (var i = 0; i <= f; i++) c[i][e] -= k * a[i]
                    }
                }
                for (var i = 0; i <= f; i++) c[i][f + 1] = 0
            }
            for (var e = 0; e < d; e++) a[e] = c[d - 1][e], c[d - 1][e] = 0;
            c[d - 1][d - 1] = 1, b[0] = 0
        }

        function c(a, b, c) {
            var d = c.length;
            for (var e = 1; e < d; e++) b[e - 1] = b[e];
            b[d - 1] = 0;
            var f = 0,
                g = 0,
                h = 1e-12;
            for (var i = 0; i < d; i++) {
                g = Math.max(g, Math.abs(a[i]) + Math.abs(b[i]));
                var j = i;
                while (j < d) {
                    if (Math.abs(b[j]) <= h * g) break;
                    j++
                }
                if (j > i) {
                    var k = 0;
                    do {
                        k++;
                        var l = a[i],
                            m = (a[i + 1] - l) / (2 * b[i]),
                            n = science.hypot(m, 1);
                        m < 0 && (n = -n), a[i] = b[i] / (m + n), a[i + 1] = b[i] * (m + n);
                        var o = a[i + 1],
                            p = l - a[i];
                        for (var e = i + 2; e < d; e++) a[e] -= p;
                        f += p, m = a[j];
                        var q = 1,
                            r = q,
                            s = q,
                            t = b[i + 1],
                            u = 0,
                            v = 0;
                        for (var e = j - 1; e >= i; e--) {
                            s = r, r = q, v = u, l = q * b[e], p = q * m, n = science.hypot(m, b[e]), b[e + 1] = u * n, u = b[e] / n, q = m / n, m = q * a[e] - u * l, a[e + 1] = p + u * (q * l + u * a[e]);
                            for (var w = 0; w < d; w++) p = c[w][e + 1], c[w][e + 1] = u * c[w][e] + q * p, c[w][e] = q * c[w][e] - u * p
                        }
                        m = -u * v * s * t * b[i] / o, b[i] = u * m, a[i] = q * m
                    } while (Math.abs(b[i]) > h * g)
                }
                a[i] = a[i] + f, b[i] = 0
            }
            for (var e = 0; e < d - 1; e++) {
                var w = e,
                    m = a[e];
                for (var x = e + 1; x < d; x++) a[x] < m && (w = x, m = a[x]);
                if (w != e) {
                    a[w] = a[e], a[e] = m;
                    for (var x = 0; x < d; x++) m = c[x][e], c[x][e] = c[x][w], c[x][w] = m
                }
            }
        }

        function d(a, b) {
            var c = a.length,
                d = [],
                e = 0,
                f = c - 1;
            for (var g = e + 1; g < f; g++) {
                var h = 0;
                for (var i = g; i <= f; i++) h += Math.abs(a[i][g - 1]);
                if (h !== 0) {
                    var j = 0;
                    for (var i = f; i >= g; i--) d[i] = a[i][g - 1] / h, j += d[i] * d[i];
                    var k = Math.sqrt(j);
                    d[g] > 0 && (k = -k), j -= d[g] * k, d[g] = d[g] - k;
                    for (var l = g; l < c; l++) {
                        var m = 0;
                        for (var i = f; i >= g; i--) m += d[i] * a[i][l];
                        m /= j;
                        for (var i = g; i <= f; i++) a[i][l] -= m * d[i]
                    }
                    for (var i = 0; i <= f; i++) {
                        var m = 0;
                        for (var l = f; l >= g; l--) m += d[l] * a[i][l];
                        m /= j;
                        for (var l = g; l <= f; l++) a[i][l] -= m * d[l]
                    }
                    d[g] = h * d[g], a[g][g - 1] = h * k
                }
            }
            for (var i = 0; i < c; i++)
                for (var l = 0; l < c; l++) b[i][l] = i === l ? 1 : 0;
            for (var g = f - 1; g >= e + 1; g--)
                if (a[g][g - 1] !== 0) {
                    for (var i = g + 1; i <= f; i++) d[i] = a[i][g - 1];
                    for (var l = g; l <= f; l++) {
                        var k = 0;
                        for (var i = g; i <= f; i++) k += d[i] * b[i][l];
                        k = k / d[g] / a[g][g - 1];
                        for (var i = g; i <= f; i++) b[i][l] += k * d[i]
                    }
                }
        }

        function e(a, b, c, d) {
            var e = c.length,
                g = e - 1,
                h = 0,
                i = e - 1,
                j = 1e-12,
                k = 0,
                l = 0,
                m = 0,
                n = 0,
                o = 0,
                p = 0,
                q, r, s, t, u = 0;
            for (var v = 0; v < e; v++) {
                if (v < h || v > i) a[v] = c[v][v], b[v] = 0;
                for (var w = Math.max(v - 1, 0); w < e; w++) u += Math.abs(c[v][w])
            }
            var x = 0;
            while (g >= h) {
                var y = g;
                while (y > h) {
                    o = Math.abs(c[y - 1][y - 1]) + Math.abs(c[y][y]), o === 0 && (o = u);
                    if (Math.abs(c[y][y - 1]) < j * o) break;
                    y--
                }
                if (y === g) c[g][g] = c[g][g] + k, a[g] = c[g][g], b[g] = 0, g--, x = 0;
                else if (y === g - 1) {
                    r = c[g][g - 1] * c[g - 1][g], l = (c[g - 1][g - 1] - c[g][g]) / 2, m = l * l + r, p = Math.sqrt(Math.abs(m)), c[g][g] = c[g][g] + k, c[g - 1][g - 1] = c[g - 1][g - 1] + k, s = c[g][g];
                    if (m >= 0) {
                        p = l + (l >= 0 ? p : -p), a[g - 1] = s + p, a[g] = a[g - 1], p !== 0 && (a[g] = s - r / p), b[g - 1] = 0, b[g] = 0, s = c[g][g - 1], o = Math.abs(s) + Math.abs(p), l = s / o, m = p / o, n = Math.sqrt(l * l + m * m), l /= n, m /= n;
                        for (var w = g - 1; w < e; w++) p = c[g - 1][w], c[g - 1][w] = m * p + l * c[g][w], c[g][w] = m * c[g][w] - l * p;
                        for (var v = 0; v <= g; v++) p = c[v][g - 1], c[v][g - 1] = m * p + l * c[v][g], c[v][g] = m * c[v][g] - l * p;
                        for (var v = h; v <= i; v++) p = d[v][g - 1], d[v][g - 1] = m * p + l * d[v][g], d[v][g] = m * d[v][g] - l * p
                    } else a[g - 1] = s + l, a[g] = s + l, b[g - 1] = p, b[g] = -p;
                    g -= 2, x = 0
                } else {
                    s = c[g][g], t = 0, r = 0, y < g && (t = c[g - 1][g - 1], r = c[g][g - 1] * c[g - 1][g]);
                    if (x == 10) {
                        k += s;
                        for (var v = h; v <= g; v++) c[v][v] -= s;
                        o = Math.abs(c[g][g - 1]) + Math.abs(c[g - 1][g - 2]), s = t = .75 * o, r = -0.4375 * o * o
                    }
                    if (x == 30) {
                        o = (t - s) / 2, o = o * o + r;
                        if (o > 0) {
                            o = Math.sqrt(o), t < s && (o = -o), o = s - r / ((t - s) / 2 + o);
                            for (var v = h; v <= g; v++) c[v][v] -= o;
                            k += o, s = t = r = .964
                        }
                    }
                    x++;
                    var z = g - 2;
                    while (z >= y) {
                        p = c[z][z], n = s - p, o = t - p, l = (n * o - r) / c[z + 1][z] + c[z][z + 1], m = c[z + 1][z + 1] - p - n - o, n = c[z + 2][z + 1], o = Math.abs(l) + Math.abs(m) + Math.abs(n), l /= o, m /= o, n /= o;
                        if (z == y) break;
                        if (Math.abs(c[z][z - 1]) * (Math.abs(m) + Math.abs(n)) < j * Math.abs(l) * (Math.abs(c[z - 1][z - 1]) + Math.abs(p) + Math.abs(c[z + 1][z + 1]))) break;
                        z--
                    }
                    for (var v = z + 2; v <= g; v++) c[v][v - 2] = 0, v > z + 2 && (c[v][v - 3] = 0);
                    for (var A = z; A <= g - 1; A++) {
                        var B = A != g - 1;
                        A != z && (l = c[A][A - 1], m = c[A + 1][A - 1], n = B ? c[A + 2][A - 1] : 0, s = Math.abs(l) + Math.abs(m) + Math.abs(n), s != 0 && (l /= s, m /= s, n /= s));
                        if (s == 0) break;
                        o = Math.sqrt(l * l + m * m + n * n), l < 0 && (o = -o);
                        if (o != 0) {
                            A != z ? c[A][A - 1] = -o * s : y != z && (c[A][A - 1] = -c[A][A - 1]), l += o, s = l / o, t = m / o, p = n / o, m /= l, n /= l;
                            for (var w = A; w < e; w++) l = c[A][w] + m * c[A + 1][w], B && (l += n * c[A + 2][w], c[A + 2][w] = c[A + 2][w] - l * p), c[A][w] = c[A][w] - l * s, c[A + 1][w] = c[A + 1][w] - l * t;
                            for (var v = 0; v <= Math.min(g, A + 3); v++) l = s * c[v][A] + t * c[v][A + 1], B && (l += p * c[v][A + 2], c[v][A + 2] = c[v][A + 2] - l * n), c[v][A] = c[v][A] - l, c[v][A + 1] = c[v][A + 1] - l * m;
                            for (var v = h; v <= i; v++) l = s * d[v][A] + t * d[v][A + 1], B && (l += p * d[v][A + 2], d[v][A + 2] = d[v][A + 2] - l * n), d[v][A] = d[v][A] - l, d[v][A + 1] = d[v][A + 1] - l * m
                        }
                    }
                }
            }
            if (u == 0) return;
            for (g = e - 1; g >= 0; g--) {
                l = a[g], m = b[g];
                if (m == 0) {
                    var y = g;
                    c[g][g] = 1;
                    for (var v = g - 1; v >= 0; v--) {
                        r = c[v][v] - l, n = 0;
                        for (var w = y; w <= g; w++) n += c[v][w] * c[w][g];
                        if (b[v] < 0) p = r, o = n;
                        else {
                            y = v, b[v] === 0 ? c[v][g] = -n / (r !== 0 ? r : j * u) : (s = c[v][v + 1], t = c[v + 1][v], m = (a[v] - l) * (a[v] - l) + b[v] * b[v], q = (s * o - p * n) / m, c[v][g] = q, Math.abs(s) > Math.abs(p) ? c[v + 1][g] = (-n - r * q) / s : c[v + 1][g] = (-o - t * q) / p), q = Math.abs(c[v][g]);
                            if (j * q * q > 1)
                                for (var w = v; w <= g; w++) c[w][g] = c[w][g] / q
                        }
                    }
                } else if (m < 0) {
                    var y = g - 1;
                    if (Math.abs(c[g][g - 1]) > Math.abs(c[g - 1][g])) c[g - 1][g - 1] = m / c[g][g - 1], c[g - 1][g] = -(c[g][g] - l) / c[g][g - 1];
                    else {
                        var C = f(0, -c[g - 1][g], c[g - 1][g - 1] - l, m);
                        c[g - 1][g - 1] = C[0], c[g - 1][g] = C[1]
                    }
                    c[g][g - 1] = 0, c[g][g] = 1;
                    for (var v = g - 2; v >= 0; v--) {
                        var D = 0,
                            E = 0,
                            F, G;
                        for (var w = y; w <= g; w++) D += c[v][w] * c[w][g - 1], E += c[v][w] * c[w][g];
                        r = c[v][v] - l;
                        if (b[v] < 0) p = r, n = D, o = E;
                        else {
                            y = v;
                            if (b[v] == 0) {
                                var C = f(-D, -E, r, m);
                                c[v][g - 1] = C[0], c[v][g] = C[1]
                            } else {
                                s = c[v][v + 1], t = c[v + 1][v], F = (a[v] - l) * (a[v] - l) + b[v] * b[v] - m * m, G = (a[v] - l) * 2 * m, F == 0 & G == 0 && (F = j * u * (Math.abs(r) + Math.abs(m) + Math.abs(s) + Math.abs(t) + Math.abs(p)));
                                var C = f(s * n - p * D + m * E, s * o - p * E - m * D, F, G);
                                c[v][g - 1] = C[0], c[v][g] = C[1];
                                if (Math.abs(s) > Math.abs(p) + Math.abs(m)) c[v + 1][g - 1] = (-D - r * c[v][g - 1] + m * c[v][g]) / s, c[v + 1][g] = (-E - r * c[v][g] - m * c[v][g - 1]) / s;
                                else {
                                    var C = f(-n - t * c[v][g - 1], -o - t * c[v][g], p, m);
                                    c[v + 1][g - 1] = C[0], c[v + 1][g] = C[1]
                                }
                            }
                            q = Math.max(Math.abs(c[v][g - 1]), Math.abs(c[v][g]));
                            if (j * q * q > 1)
                                for (var w = v; w <= g; w++) c[w][g - 1] = c[w][g - 1] / q, c[w][g] = c[w][g] / q
                        }
                    }
                }
            }
            for (var v = 0; v < e; v++)
                if (v < h || v > i)
                    for (var w = v; w < e; w++) d[v][w] = c[v][w];
            for (var w = e - 1; w >= h; w--)
                for (var v = h; v <= i; v++) {
                    p = 0;
                    for (var A = h; A <= Math.min(w, i); A++) p += d[v][A] * c[A][w];
                    d[v][w] = p
                }
        }

        function f(a, b, c, d) {
            if (Math.abs(c) > Math.abs(d)) {
                var e = d / c,
                    f = c + e * d;
                return [(a + e * b) / f, (b - e * a) / f]
            }
            var e = c / d,
                f = d + e * c;
            return [(e * a + b) / f, (e * b - a) / f]
        }
        science.lin = {}, science.lin.decompose = function() {
            function a(a) {
                var f = a.length,
                    g = [],
                    h = [],
                    i = [];
                for (var j = 0; j < f; j++) g[j] = [], h[j] = [], i[j] = [];
                var k = !0;
                for (var l = 0; l < f; l++)
                    for (var j = 0; j < f; j++)
                        if (a[j][l] !== a[l][j]) {
                            k = !1;
                            break
                        }
                if (k) {
                    for (var j = 0; j < f; j++) g[j] = a[j].slice();
                    b(h, i, g), c(h, i, g)
                } else {
                    var m = [];
                    for (var j = 0; j < f; j++) m[j] = a[j].slice();
                    d(m, g), e(h, i, m, g)
                }
                var n = [];
                for (var j = 0; j < f; j++) {
                    var o = n[j] = [];
                    for (var l = 0; l < f; l++) o[l] = j === l ? h[j] : 0;
                    n[j][i[j] > 0 ? j + 1 : j - 1] = i[j]
                }
                return {
                    D: n,
                    V: g
                }
            }
            return a
        }, science.lin.cross = function(a, b) {
            return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]
        }, science.lin.dot = function(a, b) {
            var c = 0,
                d = -1,
                e = Math.min(a.length, b.length);
            while (++d < e) c += a[d] * b[d];
            return c
        }, science.lin.length = function(a) {
            return Math.sqrt(science.lin.dot(a, a))
        }, science.lin.normalize = function(a) {
            var b = science.lin.length(a);
            return a.map(function(a) {
                return a / b
            })
        }, science.lin.determinant = function(a) {
            var b = a[0].concat(a[1]).concat(a[2]).concat(a[3]);
            return b[12] * b[9] * b[6] * b[3] - b[8] * b[13] * b[6] * b[3] - b[12] * b[5] * b[10] * b[3] + b[4] * b[13] * b[10] * b[3] + b[8] * b[5] * b[14] * b[3] - b[4] * b[9] * b[14] * b[3] - b[12] * b[9] * b[2] * b[7] + b[8] * b[13] * b[2] * b[7] + b[12] * b[1] * b[10] * b[7] - b[0] * b[13] * b[10] * b[7] - b[8] * b[1] * b[14] * b[7] + b[0] * b[9] * b[14] * b[7] + b[12] * b[5] * b[2] * b[11] - b[4] * b[13] * b[2] * b[11] - b[12] * b[1] * b[6] * b[11] + b[0] * b[13] * b[6] * b[11] + b[4] * b[1] * b[14] * b[11] - b[0] * b[5] * b[14] * b[11] - b[8] * b[5] * b[2] * b[15] + b[4] * b[9] * b[2] * b[15] + b[8] * b[1] * b[6] * b[15] - b[0] * b[9] * b[6] * b[15] - b[4] * b[1] * b[10] * b[15] + b[0] * b[5] * b[10] * b[15]
        }, science.lin.gaussjordan = function(a, b) {
            b || (b = 1e-10);
            var c = a.length,
                d = a[0].length,
                e = -1,
                f, g;
            while (++e < c) {
                var h = e;
                f = e;
                while (++f < c) Math.abs(a[f][e]) > Math.abs(a[h][e]) && (h = f);
                var i = a[e];
                a[e] = a[h], a[h] = i;
                if (Math.abs(a[e][e]) <= b) return !1;
                f = e;
                while (++f < c) {
                    var j = a[f][e] / a[e][e];
                    g = e - 1;
                    while (++g < d) a[f][g] -= a[e][g] * j
                }
            }
            e = c;
            while (--e >= 0) {
                var j = a[e][e];
                f = -1;
                while (++f < e) {
                    g = d;
                    while (--g >= e) a[f][g] -= a[e][g] * a[f][e] / j
                }
                a[e][e] /= j, g = c - 1;
                while (++g < d) a[e][g] /= j
            }
            return !0
        }, science.lin.inverse = function(a) {
            var b = a.length,
                c = -1;
            if (b !== a[0].length) return;
            a = a.map(function(a, c) {
                var d = new Array(b),
                    e = -1;
                while (++e < b) d[e] = c === e ? 1 : 0;
                return a.concat(d)
            }), science.lin.gaussjordan(a);
            while (++c < b) a[c] = a[c].slice(b);
            return a
        }, science.lin.multiply = function(a, b) {
            var c = a.length,
                d = b[0].length,
                e = b.length,
                f = -1,
                g, h;
            if (e !== a[0].length) throw {
                error: "columns(a) != rows(b); " + a[0].length + " != " + e
            };
            var i = new Array(c);
            while (++f < c) {
                i[f] = new Array(d), g = -1;
                while (++g < d) {
                    var j = 0;
                    h = -1;
                    while (++h < e) j += a[f][h] * b[h][g];
                    i[f][g] = j
                }
            }
            return i
        }, science.lin.transpose = function(a) {
            var b = a.length,
                c = a[0].length,
                d = -1,
                e, f = new Array(c);
            while (++d < c) {
                f[d] = new Array(b), e = -1;
                while (++e < b) f[d][e] = a[e][d]
            }
            return f
        }, science.lin.tridag = function(a, b, c, d, e, f) {
            var g, h;
            for (g = 1; g < f; g++) h = a[g] / b[g - 1], b[g] -= h * c[g - 1], d[g] -= h * d[g - 1];
            e[f - 1] = d[f - 1] / b[f - 1];
            for (g = f - 2; g >= 0; g--) e[g] = (d[g] - c[g] * e[g + 1]) / b[g]
        }
    }(this),
    function(a) {
        function b(a, b) {
            if (!a || !b || a.length !== b.length) return !1;
            var c = a.length,
                d = -1;
            while (++d < c)
                if (a[d] !== b[d]) return !1;
            return !0
        }

        function c(a, c) {
            var d = c.length;
            if (a > d) return null;
            var e = [],
                f = [],
                g = {}, h = 0,
                i = 0,
                j, k, l;
            while (i < a) {
                if (h === d) return null;
                var m = Math.floor(Math.random() * d);
                if (m in g) continue;
                g[m] = 1, h++, k = c[m], l = !0;
                for (j = 0; j < i; j++)
                    if (b(k, e[j])) {
                        l = !1;
                        break
                    }
                l && (e[i] = k, f[i] = m, i++)
            }
            return e
        }

        function d(a, b, c, d) {
            var e = [],
                f = a + c,
                g = b.length,
                h = -1;
            while (++h < g) e[h] = (a * b[h] + c * d[h]) / f;
            return e
        }

        function e(a) {
            var b = a.length,
                c = -1;
            while (++c < b)
                if (!isFinite(a[c])) return !1;
            return !0
        }

        function f(a) {
            var b = a.length,
                c = 0;
            while (++c < b)
                if (a[c - 1] >= a[c]) return !1;
            return !0
        }

        function g(a) {
            return (a = 1 - a * a * a) * a * a
        }

        function h(a, b, c, d) {
            var e = d[0],
                f = d[1],
                g = i(b, f);
            if (g < a.length && a[g] - a[c] < a[c] - a[e]) {
                var h = i(b, e);
                d[0] = h, d[1] = g
            }
        }

        function i(a, b) {
            var c = b + 1;
            while (c < a.length && a[c] === 0) c++;
            return c
        }
        science.stats = {}, science.stats.bandwidth = {
            nrd0: function(a) {
                var b = Math.sqrt(science.stats.variance(a));
                return (lo = Math.min(b, science.stats.iqr(a) / 1.34)) || (lo = b) || (lo = Math.abs(a[1])) || (lo = 1), .9 * lo * Math.pow(a.length, -0.2)
            },
            nrd: function(a) {
                var b = science.stats.iqr(a) / 1.34;
                return 1.06 * Math.min(Math.sqrt(science.stats.variance(a)), b) * Math.pow(a.length, -0.2)
            }
        }, science.stats.distance = {
            euclidean: function(a, b) {
                var c = a.length,
                    d = -1,
                    e = 0,
                    f;
                while (++d < c) f = a[d] - b[d], e += f * f;
                return Math.sqrt(e)
            },
            manhattan: function(a, b) {
                var c = a.length,
                    d = -1,
                    e = 0;
                while (++d < c) e += Math.abs(a[d] - b[d]);
                return e
            },
            minkowski: function(a) {
                return function(b, c) {
                    var d = b.length,
                        e = -1,
                        f = 0;
                    while (++e < d) f += Math.pow(Math.abs(b[e] - c[e]), a);
                    return Math.pow(f, 1 / a)
                }
            },
            chebyshev: function(a, b) {
                var c = a.length,
                    d = -1,
                    e = 0,
                    f;
                while (++d < c) f = Math.abs(a[d] - b[d]), f > e && (e = f);
                return e
            },
            hamming: function(a, b) {
                var c = a.length,
                    d = -1,
                    e = 0;
                while (++d < c) a[d] !== b[d] && e++;
                return e
            },
            jaccard: function(a, b) {
                var c = a.length,
                    d = -1,
                    e = 0;
                while (++d < c) a[d] === b[d] && e++;
                return e / c
            },
            braycurtis: function(a, b) {
                var c = a.length,
                    d = -1,
                    e = 0,
                    f = 0,
                    g, h;
                while (++d < c) g = a[d], h = b[d], e += Math.abs(g - h), f += Math.abs(g + h);
                return e / f
            }
        }, science.stats.erf = function(a) {
            var b = .254829592,
                c = -0.284496736,
                d = 1.421413741,
                e = -1.453152027,
                f = 1.061405429,
                g = .3275911,
                h = a < 0 ? -1 : 1;
            a < 0 && (h = -1, a = -a);
            var i = 1 / (1 + g * a);
            return h * (1 - ((((f * i + e) * i + d) * i + c) * i + b) * i * Math.exp(-a * a))
        }, science.stats.phi = function(a) {
            return .5 * (1 + science.stats.erf(a / Math.SQRT2))
        }, science.stats.kernel = {
            uniform: function(a) {
                return a <= 1 && a >= -1 ? .5 : 0
            },
            triangular: function(a) {
                return a <= 1 && a >= -1 ? 1 - Math.abs(a) : 0
            },
            epanechnikov: function(a) {
                return a <= 1 && a >= -1 ? .75 * (1 - a * a) : 0
            },
            quartic: function(a) {
                if (a <= 1 && a >= -1) {
                    var b = 1 - a * a;
                    return .9375 * b * b
                }
                return 0
            },
            triweight: function(a) {
                if (a <= 1 && a >= -1) {
                    var b = 1 - a * a;
                    return 35 / 32 * b * b * b
                }
                return 0
            },
            gaussian: function(a) {
                return 1 / Math.sqrt(2 * Math.PI) * Math.exp(-0.5 * a * a)
            },
            cosine: function(a) {
                return a <= 1 && a >= -1 ? Math.PI / 4 * Math.cos(Math.PI / 2 * a) : 0
            }
        }, science.stats.kde = function() {
            function d(d, e) {
                var f = c.call(this, b);
                return d.map(function(c) {
                    var d = -1,
                        e = 0,
                        g = b.length;
                    while (++d < g) e += a((c - b[d]) / f);
                    return [c, e / f / g]
                })
            }
            var a = science.stats.kernel.gaussian,
                b = [],
                c = science.stats.bandwidth.nrd;
            return d.kernel = function(b) {
                return arguments.length ? (a = b, d) : a
            }, d.sample = function(a) {
                return arguments.length ? (b = a, d) : b
            }, d.bandwidth = function(a) {
                return arguments.length ? (c = science.functor(a), d) : c
            }, d
        }, science.stats.kmeans = function() {
            function f(f) {
                var g = f.length,
                    h = [],
                    i = [],
                    j = 1,
                    l = 0,
                    m = c(e, f),
                    n, o, p, q, r, s, t;
                while (j && l < d) {
                    p = -1;
                    while (++p < e) i[p] = 0;
                    o = -1;
                    while (++o < g) {
                        q = f[o], s = Infinity, p = -1;
                        while (++p < e) r = a.call(this, m[p], q), r < s && (s = r, t = p);
                        i[h[o] = t]++
                    }
                    n = [], o = -1;
                    while (++o < g) {
                        q = h[o], r = n[q];
                        if (r == null) n[q] = f[o].slice();
                        else {
                            p = -1;
                            while (++p < r.length) r[p] += f[o][p]
                        }
                    }
                    p = -1;
                    while (++p < e) {
                        q = n[p], r = 1 / i[p], o = -1;
                        while (++o < q.length) q[o] *= r
                    }
                    j = 0, p = -1;
                    while (++p < e)
                        if (!b(n[p], m[p])) {
                            j = 1;
                            break
                        }
                    m = n, l++
                }
                return {
                    assignments: h,
                    centroids: m
                }
            }
            var a = science.stats.distance.euclidean,
                d = 1e3,
                e = 1;
            return f.k = function(a) {
                return arguments.length ? (e = a, f) : e
            }, f.distance = function(b) {
                return arguments.length ? (a = b, f) : a
            }, f
        }, science.stats.hcluster = function() {
            function c(c) {
                var e = c.length,
                    f = [],
                    g = [],
                    h = [],
                    i = [],
                    j, k, l, m, n, o, p, q;
                p = -1;
                while (++p < e) {
                    f[p] = 0, h[p] = [], q = -1;
                    while (++q < e) h[p][q] = p === q ? Infinity : a(c[p], c[q]), h[p][f[p]] > h[p][q] && (f[p] = q)
                }
                p = -1;
                while (++p < e) i[p] = [], i[p][0] = {
                    left: null,
                    right: null,
                    dist: 0,
                    centroid: c[p],
                    size: 1,
                    depth: 0
                }, g[p] = 1;
                for (n = 0; n < e - 1; n++) {
                    j = 0;
                    for (p = 0; p < e; p++) h[p][f[p]] < h[j][f[j]] && (j = p);
                    k = f[j], l = i[j][0], m = i[k][0];
                    var r = {
                        left: l,
                        right: m,
                        dist: h[j][k],
                        centroid: d(l.size, l.centroid, m.size, m.centroid),
                        size: l.size + m.size,
                        depth: 1 + Math.max(l.depth, m.depth)
                    };
                    i[j].splice(0, 0, r), g[j] += g[k];
                    for (q = 0; q < e; q++) switch (b) {
                        case "single":
                            h[j][q] > h[k][q] && (h[q][j] = h[j][q] = h[k][q]);
                            break;
                        case "complete":
                            h[j][q] < h[k][q] && (h[q][j] = h[j][q] = h[k][q]);
                            break;
                        case "average":
                            h[q][j] = h[j][q] = (g[j] * h[j][q] + g[k] * h[k][q]) / (g[j] + g[q])
                    }
                    h[j][j] = Infinity;
                    for (p = 0; p < e; p++) h[p][k] = h[k][p] = Infinity;
                    for (q = 0; q < e; q++) f[q] == k && (f[q] = j), h[j][q] < h[j][f[j]] && (f[j] = q);
                    o = r
                }
                return o
            }
            var a = science.stats.distance.euclidean,
                b = "simple";
            return c.distance = function(b) {
                return arguments.length ? (a = b, c) : a
            }, c
        }, science.stats.iqr = function(a) {
            var b = science.stats.quantiles(a, [.25, .75]);
            return b[1] - b[0]
        }, science.stats.loess = function() {
            function d(d, i, j) {
                var k = d.length,
                    l;
                if (k !== i.length) throw {
                    error: "Mismatched array lengths"
                };
                if (k == 0) throw {
                    error: "At least one point required."
                };
                if (arguments.length < 3) {
                    j = [], l = -1;
                    while (++l < k) j[l] = 1
                }
                e(d), e(i), e(j), f(d);
                if (k == 1) return [i[0]];
                if (k == 2) return [i[0], i[1]];
                var m = Math.floor(a * k);
                if (m < 2) throw {
                    error: "Bandwidth too small."
                };
                var n = [],
                    o = [],
                    p = [];
                l = -1;
                while (++l < k) n[l] = 0, o[l] = 0, p[l] = 1;
                var q = -1;
                while (++q <= b) {
                    var r = [0, m - 1],
                        s;
                    l = -1;
                    while (++l < k) {
                        s = d[l], l > 0 && h(d, j, l, r);
                        var t = r[0],
                            u = r[1],
                            v = d[l] - d[t] > d[u] - d[l] ? t : u,
                            w = 0,
                            x = 0,
                            y = 0,
                            z = 0,
                            A = 0,
                            B = Math.abs(1 / (d[v] - s));
                        for (var C = t; C <= u; ++C) {
                            var D = d[C],
                                E = i[C],
                                F = C < l ? s - D : D - s,
                                G = g(F * B) * p[C] * j[C],
                                H = D * G;
                            w += G, x += H, y += D * H, z += E * G, A += E * H
                        }
                        var I = x / w,
                            J = z / w,
                            K = A / w,
                            L = y / w,
                            M = Math.sqrt(Math.abs(L - I * I)) < c ? 0 : (K - I * J) / (L - I * I),
                            N = J - M * I;
                        n[l] = M * s + N, o[l] = Math.abs(i[l] - n[l])
                    }
                    if (q === b) break;
                    var O = o.slice();
                    O.sort();
                    var P = O[Math.floor(k / 2)];
                    if (Math.abs(P) < c) break;
                    var Q, G;
                    l = -1;
                    while (++l < k) Q = o[l] / (6 * P), p[l] = Q >= 1 ? 0 : (G = 1 - Q * Q) * G
                }
                return n
            }
            var a = .3,
                b = 2,
                c = 1e-12;
            return d.bandwidth = function(b) {
                return arguments.length ? (a = b, d) : b
            }, d.robustnessIterations = function(a) {
                return arguments.length ? (b = a, d) : a
            }, d.accuracy = function(a) {
                return arguments.length ? (c = a, d) : a
            }, d
        }, science.stats.mean = function(a) {
            var b = a.length;
            if (b === 0) return NaN;
            var c = 0,
                d = -1;
            while (++d < b) c += (a[d] - c) / (d + 1);
            return c
        }, science.stats.median = function(a) {
            return science.stats.quantiles(a, [.5])[0]
        }, science.stats.mode = function(a) {
            var b = {}, c = [],
                d = 0,
                e = a.length,
                f = -1,
                g, h;
            while (++f < e) h = b.hasOwnProperty(g = a[f]) ? ++b[g] : b[g] = 1, h === d ? c.push(g) : h > d && (d = h, c = [g]);
            if (c.length === 1) return c[0]
        }, science.stats.quantiles = function(a, b) {
            a = a.slice().sort(science.ascending);
            var c = a.length - 1;
            return b.map(function(b) {
                if (b === 0) return a[0];
                if (b === 1) return a[c];
                var d = 1 + b * c,
                    e = Math.floor(d),
                    f = d - e,
                    g = a[e - 1];
                return f === 0 ? g : g + f * (a[e] - g)
            })
        }, science.stats.variance = function(a) {
            var b = a.length;
            if (b < 1) return NaN;
            if (b === 1) return 0;
            var c = science.stats.mean(a),
                d = -1,
                e = 0;
            while (++d < b) {
                var f = a[d] - c;
                e += f * f
            }
            return e / (b - 1)
        }, science.stats.distribution = {}, science.stats.distribution.gaussian = function() {
            function e() {
                var d, e, f, g;
                do d = 2 * a() - 1, e = 2 * a() - 1, f = d * d + e * e; while (f >= 1 || f === 0);
                return b + c * d * Math.sqrt(-2 * Math.log(f) / f)
            }
            var a = Math.random,
                b = 0,
                c = 1,
                d = 1;
            return e.pdf = function(a) {
                return a = (a - b) / c, science_stats_distribution_gaussianConstant * Math.exp(-0.5 * a * a) / c
            }, e.cdf = function(a) {
                return a = (a - b) / c, .5 * (1 + science.stats.erf(a / Math.SQRT2))
            }, e.mean = function(a) {
                return arguments.length ? (b = +a, e) : b
            }, e.variance = function(a) {
                return arguments.length ? (c = Math.sqrt(d = +a), e) : d
            }, e.random = function(b) {
                return arguments.length ? (a = b, e) : a
            }, e
        }, science_stats_distribution_gaussianConstant = 1 / Math.sqrt(2 * Math.PI)
    }(this)
})(this);