---
title: ACM-算法速通
published: 2026-04-10
updated: 2026-04-18
description: '板子题'
image: 'https://img.lunamyth.love/2026/04/1775787478.jpg'
tags: [C++, ACM]
category: '题单'
draft: false 
---

> 封面图片来源：[超かぐや姫！：M-Ronan](https://x.com/Mirori_Ronan/status/2038968674896449836)

## 实用工具

### 随机数

```cpp
std::random_device rd;
std::mt19937 rng(rd()); 

int randint(int l, int r) {
    return std::uniform_int_distribution<int>(l, r)(rng);
}
```
### 按空格分隔字符串

```cpp
std::vector<std::string> split_space(const std::string& s) {
    std::vector<std::string> res;
    std::stringstream ss(s);
    std::string token;
    while (ss >> token) {
        res.push_back(token);
    }
    return res;
}
```

### 自定义比较器

```cpp
struct Cmp {
    bool operator()(const pii& a, const pii& b) const {
        if (a.first != b.first) return a.first < b.first;
        return a.second > b.second;
    }
};
```

## 前缀和与差分

<img src="https://img.lunamyth.love/2026/04/1775545857.jpg" width="500px">

### 前缀和

```cpp
// 一维前缀和
sum[i] = sum[i - 1] + arr[i]; 
// [l, r]
int ans = sum[r] - sum[l - 1];  
```

```cpp
// 二维前缀和
sum[i][j] = sum[i - 1][j] + sum[i][j - 1] - sum[i - 1][j - 1] + arr[i][j];
// (x1, y1) -> (x2, y2)
int ans = sum[x2][y2] - sum[x2][y1 - 1] - sum[x1 - 1][y2] + sum[x1 - 1][y1 - 1];
```

- [P1719 最大加权矩形](https://www.luogu.com.cn/problem/P1719)

### 差分

```cpp
// 一维差分
diff[i] = arr[i] - arr[i - 1];
// [l, r] + x
diff[l] += x;
diff[r + 1] -= x;
// 前缀和还原
diff[i] += diff[i - 1]; 
```

```cpp
// 二维差分
diff[i][j] = arr[i][j] - arr[i - 1][j] - arr[i][j - 1] + arr[i - 1][j - 1];
// (x1, y1) -> (x2, y2) + x
diff[x1][y1] += x;
diff[x1][y2 + 1] -= x;
diff[x2 + 1][y1] -= x;
diff[x2 + 1][y2 + 1] += x;
// 前缀和还原
diff[i][j] += diff[i - 1][j] + diff[i][j - 1] - diff[i - 1][j - 1];
```

- [P3397 地毯](https://www.luogu.com.cn/problem/P3397)

## 单调栈

```cpp
void solve() {
    int n; std::cin >> n;
    std::vector<int> arr(n);
    for (int& x : arr) std::cin >> x;
    std::vector<int> left(n, -1);
    std::vector<int> right(n, -1);
    std::stack<int> stk;
    // 求左边最近比自己小的数
    // 如果是求最近且比自己大的数，只需要改成 arr[i] >= arr[stk.top()]
    for (int i = 0; i < n; i++) {
        while (!stk.empty() && arr[i] <= arr[stk.top()]) stk.pop();
        if (!stk.empty()) left[i] = stk.top();
        stk.push(i);
    }

    while (!stk.empty()) stk.pop();

    // 求右边最近比自己小的数
    for (int i = n - 1; i >= 0; i--) {
        while (!stk.empty() && arr[i] <= arr[stk.top()]) stk.pop();
        if (!stk.empty()) right[i] = stk.top();
        stk.push(i);
    }
    for (int i = 0; i < n; i++) std::cout << left[i] << " "; std::cout << '\n';
    for (int i = 0; i < n; i++) std::cout << right[i] << " "; std::cout << '\n';
}
```

- [P5788 【模板】单调栈](https://www.luogu.com.cn/problem/P5788)

## 数论

### 埃氏筛法

```cpp
const int N = 1e6 + 1;
int primes[N], cnt = 0;
bool vis[N];

void get_primes(int n) {
    for (int i = 2; i <= n; i++) {
        if (vis[i]) continue;
        primes[++cnt] = i;
        for (int j = i + i; j <= n; j += i) {
            vis[j] = true;
        }
    }
}
```

### 线性筛法

```cpp
const int N = 1e6 + 1;
int primes[N], cnt = 0;
bool vis[N];

void get_primes(int n) {
    for (int i = 2; i <= n; i++) {
        if (!vis[i]) primes[++cnt] = i;
        for (int j = 1; primes[j] * i <= n; j++) {
            vis[primes[j] * i] = true;
            if (i % primes[j] == 0) break;
        }
    }
}
```

- [P3383 【模板】线性筛素数](https://www.luogu.com.cn/problem/P3383)

### 快速幂

```cpp
int qpow(int a, int b, int p) {
    int ans = 1;
    while (b > 0) {
        if (b & 1) ans = ans * a % p;
        a = a * a % p;
        b >>= 1;
    }
    return ans;
}
```

[P1226 【模板】快速幂](https://www.luogu.com.cn/problem/P1226)

### 矩阵快速幂

```cpp
const int mod = 1e9 + 7;
const int N = 101;

struct Matrix {
    int m[N][N];
    int n; // 当前矩阵的实际大小

    // 构造函数：初始化全为 0
    Matrix(int size) {
        n = size;
        memset(m, 0, sizeof(m));
    }

    // 初始化为单位矩阵
    void init_E() {
        for (int i = 1; i <= n; i++) m[i][i] = 1;
    }

    // 重载乘法运算符
    Matrix operator*(Matrix& b) {
        Matrix ans(n);
        for (int i = 1; i <= n; i++) {
            for (int k = 1; k <= n; k++) {
                if (m[i][k] == 0) continue;
                for (int j = 1; j <= n; j++) {
                    ans.m[i][j] = (ans.m[i][j] + m[i][k] * b.m[k][j]) % mod;
                }
            }
        }
        return ans;
    }
};

Matrix qpow(Matrix a, int k) {
    Matrix ans(a.n);
    ans.init_E();
    while (k > 0) {
        if (k & 1) ans = ans * a;
        a = a * a;
        k >>= 1;
    }
    return ans;
}

void solve() {
    int n, k; std::cin >> n >> k;
    Matrix a(n);
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= n; j++) {
            std::cin >> a.m[i][j];
        }
    }
    Matrix ans = qpow(a, k);
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= n; j++) {
            std::cout << ans.m[i][j] << " ";
        }
        std::cout << '\n';
    }
}
```

- [P3390 【模板】矩阵快速幂](https://www.luogu.com.cn/problem/P3390)

### 费马小定理

若 $p$ 为质数，且 $\gcd(a, p) = 1$，则有 $a^{p-1} \equiv 1 \pmod{p}$

由逆元的定义，$a\operatorname{inv}(a) \equiv 1 \equiv a^{p-1} \pmod{p}$

于是得到 $\operatorname{inv}(a) \equiv a^{p-2} \pmod{p}$

```cpp
int qpow(int a, int b, int p) {
    int ans = 1;
    while (b > 0) {
        if (b & 1) ans = ans * a % p;
        a = a * a % p;
        b >>= 1;
    }
    return ans;
}

int inv(int a, int p) {
    return qpow(a, p - 2, p);
}
```

## 前缀树

```cpp
/*
有多少个字符串以某一个字符串作为开头
pass：只要经过就 + 1
end： 以这个字符结束 + 1
没有路就新建节点，已经有路了就复用节点
*/

const int N = 1e6 + 1;
// tree[i][j]: 从 i 节点经过 j 到了 tree[i][j] 节点
int tree[N][26];
int pass[N];
int end[N];
int cnt = 1;

void insert(std::string& str) {
    int pos = 1;
    pass[pos]++;
    for (char ch : str) {
        int path = ch - 'a';
        if (tree[pos][path] == 0) tree[pos][path] = ++cnt;
        pos = tree[pos][path];
        pass[pos]++;
    }
    end[pos]++;
}


int find(std::string& str) {
    int pos = 1;
    for (char ch : str) {
        int path = ch - 'a';
        if (tree[pos][path] == 0) return 0;
        pos = tree[pos][path];
    }
    return end[pos];
}


int prefix(std::string& str) {
    int pos = 1;
    for (char ch : str) {
        int path = ch - 'a';
        if (tree[pos][path] == 0) return 0;
        pos = tree[pos][path];
    }
    return pass[pos];
}

void erase(std::string& str) {
    if (find(str)) {
        int pos = 1;
        pass[pos]--;
        for (char ch : str) {
            int path = ch - 'a';
            if (--pass[tree[pos][path]] == 0) {
                tree[pos][path] = 0;
                return;
            }
            pos = tree[pos][path];
        }
        end[pos]--;
    }
}

void clear() {
    for (int i = 1; i <= cnt; i++) {
        for (int j = 0; j < 26; j++) tree[i][j] = 0;
        pass[i] = 0;
        end[i] = 0;
    }
    cnt = 1;
}
```

- [P8306 【模板】字典树 / Trie](https://www.luogu.com.cn/problem/P8306)

## 并查集

```cpp
const int N = 1e6 + 1;

int p[N];
int size[N];

int find(int x) {
    if (p[x] != x) p[x] = find(p[x]);
    return p[x];
}

void merge(int x, int y) {
    int fx = find(x);
    int fy = find(y);
    if (fx != fy) {
        p[fx] = fy;
        size[fy] += size[fx];
    }
}

void solve() {
    int n, m; std::cin >> n >> m;
    for (int i = 1; i <= n; i++) p[i] = i, size[i] = 1;
}
```

- [P3367 【模板】并查集](https://www.luogu.com.cn/problem/P3367)

## 字符串哈希

```cpp
using uii = unsigned long long;
const int N = 1e6 + 1, base = 131;

uii h[N], p[N];

uii get_hash(int l, int r) {
    return h[r] - h[l - 1] * p[r - l + 1];
}

void solve() {
    std::string str; std::cin >> str;
    int n = str.size();
    int m; std::cin >> m;
    str = " " + str;

    p[0] = 1;
    for (int i = 1; i <= n; i++) {
        p[i] = p[i - 1] * base;
        h[i] = h[i - 1] * base + str[i];
    }

    for (int i = 0; i < m; i++) {
        int l1, r1, l2, r2; std::cin >> l1 >> r1 >> l2 >> r2;
        std::cout << (get_hash(l1, r1) == get_hash(l2, r2) ? "Yes" : "No") << '\n';  
    }
}
```

[P10468 兔子与兔子](https://www.luogu.com.cn/problem/P10468)

## 图论

### 最小生成树

```cpp
const int N = 2e5 + 1;
int p[N];

int find(int x) {
    if (p[x] != x) p[x] = find(p[x]);
    return p[x];
}

void solve() {  
    int n, m; std::cin >> n >> m;
    for (int i = 1; i <= n; i++) p[i] = i;
    std::vector<std::array<int, 3>> arr(m + 1);
    for (int i = 1; i <= m; i++) {
        int x, y, z; std::cin >> x >> y >> z;
        arr[i] = {x, y, z};
    }
    std::sort(arr.begin() + 1, arr.end(), [](auto& a, auto& b){
        return a[2] < b[2];
    }); 
    int cnt = 0, sum = 0;
    for (int i = 1; i <= m; i++) {
        auto [x, y, z] = arr[i];
        int fx = find(x), fy = find(y);
        if (fx != fy) {
            p[fx] = fy;
            sum += z; cnt++;
            if (cnt >= n - 1) {
                std::cout << sum << '\n';
                return;
            }
        }
    }
    std::cout << "orz" << '\n';
}
```

- [P3366 【模板】最小生成树](https://www.luogu.com.cn/problem/P3366)

### 拓扑排序

```cpp
void solve() {
    int n; std::cin >> n;
    std::vector<std::vector<int>> g(n + 1);
    std::vector<int> indeg(n + 1);
    for (int i = 1; i <= n; i++) {
        while (true) {
            int x; std::cin >> x;
            if (x == 0) break;
            g[i].push_back(x);
            indeg[x]++;
        }
    }
    std::queue<int> q;
    std::vector<int> ans;
    for (int i = 1; i <= n; i++) {
        if (indeg[i] == 0) {
            q.push(i);
            ans.push_back(i);
        }
    }
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (auto v : g[u]) {
            indeg[v]--;
            if (indeg[v] == 0) {
                q.push(v);
                ans.push_back(v);
            }
        }
    }
    for (int x : ans) std::cout << x << " "; std::cout << '\n';
}
```

- [B3644 【模板】拓扑排序 / 家谱树](https://www.luogu.com.cn/problem/B3644)
- [P1807 最长路](https://www.luogu.com.cn/problem/P1807)

## 树

### 树的遍历

> pos 初始化为顶点位置

```cpp
const int N = 1e5 + 1;
int in[N], post[N], l[N], r[N];
int pos[N];

int build(int il, int ir, int pl, int pr) {
    if (il > ir) return 0;
    int root = post[pr];
    int k = pos[root];
    int len = k - il;
    l[root] = build(il, k - 1, pl, pl + len - 1);
    r[root] = build(k + 1, ir, pl + len, pr - 1);
    return root;
}

// 先序遍历
void pre(int root) {
    if (!root) return;
    std::cout << root << " ";
    pre(l[root]);
    pre(r[root]);
}

// 层序遍历
void bfs(int root) {
    std::queue<int> q; q.push(root);
    while (!q.empty()) {
        int u = q.front(); q.pop();
        std::cout << u << " ";
        if (l[u]) q.push(l[u]);
        if (r[u]) q.push(r[u]);
    }
}
```

- [P1030 [NOIP 2001 普及组] 求先序排列](https://www.luogu.com.cn/problem/P1030)


## 最短路

### Dijkstra

```cpp
const int N = 1e5 + 1;
using pii = std::pair<int, int>;

std::vector<pii> g[N];
bool vis[N];
int d[N];

void dijkstra(int s) {
    std::priority_queue<pii, std::vector<pii>, std::greater<pii>> heap;
    d[s] = 0; heap.push({0, s});
    while (!heap.empty()) {
        int u = heap.top().second; heap.pop();
        if (vis[u]) continue;
        vis[u] = true;
        for (auto [v, w] : g[u]) {
            if (!vis[v] && d[u] + w < d[v]) {
                d[v] = d[u] + w;
                heap.push({d[v], v});
            }
        }
    }
}

void solve() {
    int n, m, s; std::cin >> n >> m >> s;
    for (int i = 1; i <= n; i++) d[i] = LLONG_MAX;
    for (int i = 0; i < m; i++) {
        int u, v, w; std::cin >> u >> v >> w;
        g[u].push_back({v, w});
    }
    dijkstra(s);
    for (int i = 1; i <= n; i++) std::cout << d[i] << ' '; std::cout << '\n';
}
```

- [P4779 【模板】单源最短路径（标准版）](https://www.luogu.com.cn/problem/P4779)

### Floyd

```cpp
const int N = 101;

int d[N][N];

void floyd(int n) {
    for (int k = 1; k <= n; k++) {
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n; j++) {
                if (d[i][k] != LLONG_MAX &&
                    d[k][j] != LLONG_MAX &&
                    d[i][k] + d[k][j] < d[i][j]) {
                    d[i][j] = d[i][k] + d[k][j];
                }
            }
        }
    }
}

void solve() {
    int n, m; std::cin >> n >> m;
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= n; j++) {
            if (i != j) d[i][j] = LLONG_MAX;
        }
    }
    for (int i = 0; i < m; i++) {
        int u, v, w; std::cin >> u >> v >> w;
        d[u][v] = std::min(d[u][v], w);
        d[v][u] = std::min(d[v][u], w);
    }
    floyd(n);
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= n; j++) {
            std::cout << d[i][j] << ' ';
        }
        std::cout << '\n';
    }
}
```

### SPFA

```cpp
const int N = 2e3 + 1;
using pii = std::pair<int, int>;

std::vector<pii> g[N];
int cnt[N];   
int d[N];
bool vis[N];  // 在队列里面为 true，出队列为 false

void clear(int n) {
    for (int i = 1; i <= n; i++) {
        g[i].clear();
        cnt[i] = 0;
        d[i] = LLONG_MAX;
        vis[i] = false;
    }
}
 
bool spfa(int n) {
    std::queue<int> q;
    d[1] = 0; q.push(1);
    while (!q.empty()) {
        int u = q.front(); q.pop();
        vis[u] = false;
        for (auto [v, w] : g[u]) {
            if (d[u] + w < d[v]) {
                d[v] = d[u] + w;
                if (!vis[v]) {
                    cnt[v]++;
                    vis[v] = true;
                    q.push(v);
                    if (cnt[v] >= n) return true; // 有负环
                }
            }
        }
    }
    return false;
}
```

- [P3385 【模板】负环](https://www.luogu.com.cn/problem/P3385)

## KMP

```cpp
const int N = 1e6 + 1;
int next[N];

// 模式串的 next
void getNext(std::string& p) {
    int m = p.size() - 1;
    for (int i = 2, j = 0; i <= m; i++) {
        // 不匹配 j 往回跳
        while (j > 0 && p[i] != p[j + 1]) j = next[j];
        // 匹配上了前缀长度增加
        if (p[i] == p[j + 1]) j++;
        next[i] = j;
    }   
}

std::vector<int> kmp(std::string& s, std::string& p) {
    int n = s.size() - 1;
    int m = p.size() - 1;
    getNext(p);
    std::vector<int> pos;
    for (int i = 1, j = 0; i <= n; i++) {
        while (j > 0 && s[i] != p[j + 1]) j = next[j];
        if (s[i] == p[j + 1]) j++;
        // 匹配成功
        if (j == m) {
            pos.push_back(i - m + 1);
            // 继续寻找下一个
            j = next[j];
        }
    }
    return pos;
}

void solve() {
    std::string s, p; std::cin >> s >> p;
    s = " " + s; p = " " + p;
    std::vector<int> pos = kmp(s, p);
    for (int x : pos) std::cout << x << '\n';
    for (int i = 1; i <= p.size() - 1; i++) std::cout << next[i] << " "; std::cout << '\n';
}
```

- [P3375 【模板】KMP](https://www.luogu.com.cn/problem/P3375)

## 树状数组

> 用差分实现范围修改单点查询

```cpp
const int N = 1e6 + 1;
int tree[N];
int n, m;

int lowbit(int i) {
    return i & -i; 
}

// i 位置增加 v
void add(int i, int v) {
    while (i <= n) {
        tree[i] += v;
        i += lowbit(i);
    }
}

// [1, i] 位置上的累加和
int sum(int i) {
    int ans = 0;
    while (i > 0) {
        ans += tree[i];
        i -= lowbit(i);
    }
    return ans;
}

int range(int l, int r) {
    return sum(r) - sum(l - 1);
}
```

- [P3374 【模板】树状数组 1](https://www.luogu.com.cn/problem/P3374)
- [P3368 【模板】树状数组 2](https://www.luogu.com.cn/problem/P3368)

## ST 表

> Max, Min, GCD, AND, OR 都可以使用

```cpp
const int N = 1e5 + 1;
const int LOGN = 21;

int arr[N];
int st[LOGN][N]; 
int n, m;

// st[p][i] 表示以 i 为起点，长度为 2^p 的区间内的最值
void build() {
    for (int i = 1; i <= n; i++) st[0][i] = arr[i];
    int max_p = std::__lg(n);
    for (int p = 1; p <= max_p; p++) {
        for (int i = 1; i + (1 << p) - 1 <= n; i++) {
            // 左半部分 [i, i + 2^(p-1) - 1]
            // 右半部分 [i + 2^(p-1), i + 2^p - 1]
            // for 循环的范围就是 r <= n
            st[p][i] = std::max(st[p - 1][i], st[p - 1][i + (1 << (p - 1))]);
        }
    }
}

int query(int l, int r) {
    int p = std::__lg(r - l + 1);
    // [l, l + 2^p - 1] 和 [r - 2^p + 1, r]
    return std::max(st[p][l], st[p][r - (1 << p) + 1]);
}
```

- [P3865 【模板】ST 表 & RMQ 问题](https://www.luogu.com.cn/problem/P3865)

## LCA

> `fa[大][小]`，lca 还可以维护两点之间的最短距离和最大边权（注意要先更新再跳转）

$$ 
dis(u, v) = deep[u] + deep[v] - 2 * deep[lca(u, v)] 
$$

$$
dis(u, v) = pre[u] + pre[v] - 2 * pre[lca(u, v)]
$$

$$
dis(u, v) = dis(u, X) + dis(X, v)
$$

$$
lca(a, b, c) = lca(lca(a, b), c)
$$

- 点差分
```cpp
diff[u]++;
diff[v]++;
diff[lca]--;
diff[fa[lca][0]]--;
```

- 边差分
```cpp
diff[u]++;
diff[v]++;
diff[lca] -= 2;
```

- 差分累加还原
```cpp
int diff[N];
int cnt[N];

void get_cnt(int u, int parent) {
    cnt[u] = diff[u];
    for (int v : g[u]) {
        if (v != parent) {
            get_cnt(v, u);
            cnt[u] += cnt[v];
        }
    }
}
```

```cpp
const int N = 5e5 + 1;
const int LOGN = 21;

std::vector<int> g[N];
int deep[N];
// fa[u][p] 表示 u 向上跳 2^p 层会到达的节点
int fa[N][LOGN];
// max_p = std::__lg(n); 
int max_p;   

// max_w[u][p] 表示 u 向上跳 2^p 层，沿途的最大边权
// int max_w[N][LOGN]; 

// pre[i] 表示从根节点到 i 节点的路径长
// int pre[N];

// u 是当前节点，parent 是它的直接父亲
void dfs(int u, int parent) {
    deep[u] = deep[parent] + 1;
    fa[u][0] = parent;

    // max_w[u][0] = w;
    // pre[u] = pre[parent] + w

    for (int p = 1; p <= max_p; p++) {
        // u 向上 2^p <==> u 向上 2^(p-1)，再从新位置再向上 2^(p-1)
        fa[u][p] = fa[fa[u][p - 1]][p - 1];

        // max_w[u][p] = std::max(max_w[u][p - 1], max_w[fa[u][p - 1]][p - 1]);
        
    }
    for (int v : g[u]) {
        if (v != parent) dfs(v, u);
    }
}

int lca(int a, int b) {

    // int ans = 0;

    if (deep[a] < deep[b]) std::swap(a, b);

    // 使得 a, b 到达同一高度
    for (int p = max_p; p >= 0; p--) {
        if (deep[fa[a][p]] >= deep[b]) {

            // ans = std::max(ans, max_w[a][p]);

            a = fa[a][p];
        }
    }
    if (a == b) return a;
    for (int p = max_p; p >= 0; p--) {
        if (fa[a][p] != fa[b][p]) {

            // ans = std::max({ans, max_w[a][p], max_w[b][p]});

            a = fa[a][p];
            b = fa[b][p];

        }
    }

    // ans = std::max({ans, max_w[a][0], max_w[b][0]});

    return fa[a][0];
}
```

- [P3379 【模板】最近公共祖先（LCA）](https://www.luogu.com.cn/problem/P3379)

## 线段树

```cpp
const int N = 1e5 + 1;

int arr[N];

struct Node {
    int l, r;
    int sum, add;
} tr[N << 2];

void up(int i) {
    tr[i].sum = tr[i << 1].sum + tr[i << 1 | 1].sum;
}

void build(int l, int r, int i) {
    tr[i] = {l, r, 0, 0}; 
    if (l == r) {
        tr[i].sum = arr[l];
        return;
    }
    int mid = (l + r) >> 1; 
    build(l, mid, i << 1);
    build(mid + 1, r, i << 1 | 1);
    up(i);
}

void lazy(int i, int v) {
    tr[i].sum += (tr[i].r - tr[i].l + 1) * v;
    tr[i].add += v;
}

void down(int i) {
    if (tr[i].add != 0) {
        lazy(i << 1, tr[i].add);
        lazy(i << 1 | 1, tr[i].add);
        tr[i].add = 0;
    }
}

void modify(int jobl, int jobr, int jobv, int i) {
    if (jobl <= tr[i].l && tr[i].r <= jobr) {
        lazy(i, jobv);
        return;
    }
    down(i);
    int mid = (tr[i].l + tr[i].r) >> 1;
    if (jobl <= mid) modify(jobl, jobr, jobv, i << 1);
    if (jobr > mid)  modify(jobl, jobr, jobv, i << 1 | 1);
    up(i);
}

int query(int jobl, int jobr, int i) {
    if (jobl <= tr[i].l && tr[i].r <= jobr) {
        return tr[i].sum;
    }
    down(i);
    int mid = (tr[i].l + tr[i].r) >> 1;
    int ans = 0;
    if (jobl <= mid) ans += query(jobl, jobr, i << 1);
    if (jobr > mid)  ans += query(jobl, jobr, i << 1 | 1);
    return ans;
}
```

- [P3372 【模板】线段树 1](https://www.luogu.com.cn/problem/P3372)

## 组合数

$$
    \binom{n}{m} = \frac{n!}{m!(n-m)!}
$$

### 阶乘逆元预处理

$$
    \operatorname{inv}(i) \equiv \operatorname{inv}(i+1) \cdot (i + 1)\pmod{p}
$$

```cpp
const int N = 1e6, mod = 1e9 + 7;
int fac[N + 1], inv[N + 1];

int qpow(int a, int b) {
    int ans = 1;
    while (b > 0) {
        if (b & 1) ans = ans * a % mod;
        a = a * a % mod;
        b >>= 1;
    }
    return ans;
}

void build() {
    fac[0] = 1;
    for (int i = 1; i <= N; i++) fac[i] = fac[i - 1] * i % mod;
    inv[N] = qpow(fac[N], mod - 2);
    for (int i = N - 1; i >= 0; i--) inv[i] = inv[i + 1] * (i + 1) % mod;
}

int C(int n, int m) {
    if (m < 0 || m > n) return 0;
    return fac[n] * inv[n - m] % mod * inv[m] % mod;
}
```

### 卢卡斯定理

对于素数 $ p $，有
$$
    \binom{n}{m} \equiv \binom{n \bmod p}{m \bmod p} \binom{\left\lfloor \frac{n}{p} \right\rfloor}{\left\lfloor \frac{m}{p} \right\rfloor} \pmod p
$$
其中，当 $ m > n $ 时，$ \binom{n}{m} $ = 0

> 注意 build 构建的范围是 $[0, p - 1]$

```cpp
int lucas(int n, int m, int p) {
    if (n < p && m < p) return C(n, m, p);
    return C(n % p, m % p, p) * lucas(n / p, m / p, p) % p;
}
```

- [P3807 【模板】卢卡斯定理 / Lucas 定理](https://www.luogu.com.cn/problem/P3807)