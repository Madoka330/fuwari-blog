---
title: ACM-算法速通
published: 2026-04-10
description: '板子题'
image: 'https://img.lunamyth.love/2026/04/1775787478.jpg'
tags: [C++, ACM]
category: '题单'
draft: false 
---

> 封面图片来源：[超かぐや姫！：M-Ronan](https://x.com/Mirori_Ronan/status/2038968674896449836)

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

