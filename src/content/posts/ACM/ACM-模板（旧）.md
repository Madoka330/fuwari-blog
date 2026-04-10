---
title: ACM-模板（旧）
published: 2026-04-07
description: '之前整理的模板，不过许多地方已经过时了'
image: 'https://img.lunamyth.love/2026/04/1775544804.jpg'
tags: [算法, ACM]
category: '模板'
draft: false 
---

> 封面图片来源：[私を喰べたい、ひとでなし：YKK](https://x.com/ykke0866/status/2040754113135436286?s=20)

# 1. 二分

## 1.1. 二分答案法

```cpp
bool check(int x) {
    // 判断 x 是否满足条件
}

void solve() {
    // 确定上下界
    int l = 1, r = 1e18, ans = -1;
    while (l <= r) {
        int mid = (l + r) / 2;
        if (check(mid)) {
            ans = mid;
            r = mid - 1; // 如果满足条件，尝试更小的情况
        } else { 
            l = mid + 1; // 否则尝试更大的情况
        }
    }
}
```

# 2. 前缀和与差分

## 2.1. 前缀和

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

<img src="https://img.lunamyth.love/2026/04/1775545857.jpg" width="500px">

## 2.2. 差分

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

# 3. 单调栈

```cpp
void solve() {
    int n; cin >> n;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    vector<int> left(n, -1);
    vector<int> right(n, -1);
    stack<int> stk;
    // 求左边最近比自己小的数
	// 如果是求最近且比自己大的数，只需要改成 arr[i] >= arr[stk.top()]
    for (int i = 0; i < n; i++) {
        while (!stk.empty() && arr[i] <= arr[stk.top()]) {
            stk.pop();
        }
        if (!stk.empty()) left[i] = arr[stk.top()];
        stk.push(i);
    }
    // 求右边最近比自己小的数
    while (!stk.empty()) stk.pop();
    for (int i = n - 1; i >= 0; i--) {
        while (!stk.empty() && arr[i] <= arr[stk.top()]) {
            stk.pop();
        }
        if (!stk.empty()) right[i] = arr[stk.top()];
        stk.push(i);
    }
    for (int i = 0; i < n; i++) cout << left[i] << " ";
    cout << endl;
    for (int i = 0; i < n; i++) cout << right[i] << " ";
    cout << endl; 
}
```

# 4. 质数

## 4.1. 判断质数

```cpp
bool is_prime(int n) {
	if (n < 2) return 0;
	for (int i = 2; i <= n / i; i++) {
		if (n % i == 0) return false; 
	}
	return true;
}
```

## 4.2. 分解质因数

```cpp
void divide(int N)
{
	int n = N;
	for (int i = 2; i <= N / i; i++) {
		if (n % i == 0) {
			int sum = 0;
			while (n % i == 0) {
				n /= i;
				sum++;
			}
			cout << i << " " << sum << endl;
		}
	}
	if (n > 1) cout << n << " " << 1 << endl;
}
```

## 4.3. 埃氏筛法

```cpp
const int N = 1000010;
int primes[N], cnt;
bool vis[N];

void get_primes(int n) {
	for (int i = 2; i <= n; i++) {
		if (vis[i]) continue;
		// 记录素数
		primes[cnt++] = i;
		// 筛选倍数
		for (int j = i + i; j <= n; j += i) {
			vis[j] = true;
		}
	}
}
```

## 4.4. 线性筛法

```cpp
const int N = 1000010;
int primes[N], cnt;
bool vis[N];

void get_primes(int n) {
	for (int i = 2; i <= n; i++) {
		if (!vis[i]) primes[cnt++] = i;
		// 在 i 确定的时候可以选取哪几个素数
		for (int j = 0; primes[j] * i <= n; j++) {
            // 合数 = 最小质因子 * 另一个数
			vis[primes[j] * i] = true;
            // 如果 primes[j] 是 i 的最小质因子，跳出
			if (i % primes[j] == 0) break;
 		}
	}
}
```

## 4.5. 约数

```cpp
vector<int> get_divisors(int n)
{
	vector<int> ans;
	for (int i = 1; i <= n / i; i++) {
		if (n % i == 0) {
			ans.push_back(i);
			if (i != n / i) ans.push_back(n / i);	
		}
	}
	sort(ans.begin(), ans.end());
	return ans;	
}
```

# 5. 前缀树

```cpp
// 前缀树
// 有多少个字符串以某一个字符串作为开头
// pass 只要经过就 + 1
// end 以这个字符结束 + 1
// 没有路就新建节点，已经有路了就复用节点

const int N = 1e6 + 10;
// tree[i][j]: 从 i 节点经过 j 到了 tree[i][j] 节点
int tree[N][26];
int e[N];
int p[N];
int cnt = 1;

void insert(string str) {
    // 头节点是 1
    // 每次都从头节点出发
    int pos = 1;
    p[pos]++;
    for (int i = 0; i < str.size(); i++) {
        int path = str[i] - 'a';
        // 如果是 0, 那就说明从 pos 出发走 path 还没有节点
        // 那就新建一个节点
        if (tree[pos][path] == 0) {
            tree[pos][path] = ++cnt;
        }
        // 此时的 pos 就是下一个节点
        pos = tree[pos][path];
        // pos 这个节点经过的次数 + 1
        p[pos]++;
    }
    // 到最后一个位置, 以这个节点结束的位置 + 1
    e[pos]++;
}

int find(string str) {
    int pos = 1;
    for (int i = 0; i < str.size(); i++) {
        int path = str[i] - 'a';
        // 此路不同，那就没找到
        if (tree[pos][path] == 0) {
            return 0;
        }
        pos = tree[pos][path];
    }
    return e[pos];
}

int prefix(string str) {
    int pos = 1;
    for (int i = 0; i < str.size(); i++) {
        int path = str[i] - 'a';
        if (tree[pos][path] == 0) {
            return 0;
        }
        pos = tree[pos][path];
    }
    return p[pos];
}

void erase(string str) {
    if (find(str)) {
        int pos = 1;
        p[pos]--;
        for (int i = 0; i < str.size(); i++) {
            int path = str[i] - 'a';
            // 下一个位置 - 1 之后如果 = 0, 那么剩下的都不用看了 
            if (--p[tree[pos][path]] == 0) {
                // 此路不通
                tree[pos][path] = 0;
                return;
            }
            pos = tree[pos][path];
        }
        e[pos]--;
    }      
}

void clear() {
    for (int i = 1; i <= cnt; i++) {
        memset(tree[i], 0, sizeof tree[i]);
        e[i] = 0;
        p[i] = 0;
    }
    cnt = 1;
}
```

# 6. 并查集

```cpp
const int N = 100010;

int n, m;
int p[N];
int size[N];

int find(int x){
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
    for (int i = 1; i <= n; i++) p[i] = i, size[i] = 1;
}
```

# 7. 字符串哈希

```cpp
typedef unsigned long long ULL;

const int N = 100010, P = 131;

int n, m;
string str;
ULL h[N], p[N];

ULL get(int l, int r)
{
	return h[r] - h[l - 1] * p[r - l + 1];
}

int main()
{
    p[0] = 1;
	cin >> n >> m >> str;
	str = " " + str;
	for (int i = 1; i <= n; i++) {
		// 初始化p数组
		p[i] = p[i - 1] * P;
		// 前缀和求整个字符串的哈希值
		h[i] = h[i - 1] * P + str[i]; 
	}
	while(m--) {
		int l1, r1, l2, r2;
		cin >> l1 >> r1 >> l2 >> r2;
		if (get(l1, r1) == get(l2, r2)) {
			cout << "Yes" << endl;                                         
		} else {
			cout << "No" << endl;
		}
	} 
	return 0;
}
```

# 8. 图论

## 8.1. 最小生成树

```cpp
const int N = 5555;
int p[N];
int find(int x) {
    if (p[x] != x) p[x] = find(p[x]);
    return p[x];
}

struct Data{
    int u, v, w;
};
int n, m;
bool cmp(Data x, Data y) {
    return x.w < y.w;
}

void solve() {
    cin >> n >> m;
    vector<Data> arr(m);
    for (int i = 1; i <= n; i++) p[i] = i;
    for (int i = 0; i < m; i++) {
        int u, v, w; cin >> u >> v >> w;
        arr[i] = {u, v, w};
    }
    sort(arr.begin(), arr.end(), cmp);
    int cnt = 0;
    int sum = 0;
    // 如果连通，那么至少要 n - 1 条边
    for (int i = 0; i < m; i++) {
        int u = arr[i].u, v = arr[i].v, w = arr[i].w;
        if (find(u) != find(v)) {
            p[find(u)] = find(v);
            sum += w;
            cnt++;
        }
    }
    if (cnt >= n - 1) {
        cout << sum << endl;
    } else {
        cout << "orz" << endl;
    }
}  
```

## 8.2. 拓扑排序

```cpp
void solve() {
    int n, m; cin >> n >> m;
    vector<vector<int>> g(n + 1);
    // 入度
    vector<int> indeg(n + 1);
    for (int i = 0; i < m; i++) {
        int u, v; cin >> u >> v;
        g[u].push_back(v);
        indeg[v]++;
    }
    queue<int> q;
    vector<int> ans;
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
    if (ans.size() == n) {
        for (int i = 0; i < n; i++) cout << ans[i] << " "; cout << endl;
    } else cout << -1 << endl;
}
```

## 8.3. 链式前向星

<img src="https://img.lunamyth.love/2026/04/1775545868.png">

```cpp
#include <bits/stdc++.h>
using namespace std;
#define int long long
 
// N: 最大点的数量
// M: 最大边的数量
// 无向图的时候记得开 2 倍 M 的空间
const int N = 1e5, M = 1e5;
int n, m;
// h[i]: 存 i 节点的头边号
// next[i]: 存 i 边的下个一个边的边号
// to[i]: 存 i 边指向的点的编号
// w[i]: 存 i 边指向的边的权值
int h[N + 1];
struct Edge{
    int to, w, next;
} e[M + 1];

int cnt = 1;

// u -> v 权值为 w
void add(int u, int v, int w) {
    e[cnt].next = h[u];
    e[cnt].to = v;
    e[cnt].w = w;
    h[u] = cnt++;
}

void clear() {
    for (int i = 1; i <= n; i++) h[i] = 0;
    cnt = 1;
}

void solve() {
    cin >> n >> m;
    for (int i = 0; i < m; i++) {
        int u, v, w; cin >> u >> v >> w;
        add(u, v, w);
    }
    for (int u = 1; u <= n; u++) {
        for (int i = h[u]; i; i = e[i].next) {
            int v = e[i].to, w = e[i].w;
            printf("%d -> %d, w = %d\n", u, v, w);
        }
    }
    clear();
}

signed main() {
    ios::sync_with_stdio(0); cin.tie(0);
    int T = 1;
    // cin >> T;
    while (T--) solve();
    return 0;
}
```

# 9. 最短路

## 9.1. Dijkstra

```cpp
#include <bits/stdc++.h>
using namespace std;
#define int long long
#define PII pair<int, int>

const int N = 1e5 + 1;
vector<PII> g[N];
bool vis[N];
int d[N];
int n, m, s; 

void clear() {
    for (int i = 0; i < N; i++) g[i].clear();
    fill(d, d + N, LLONG_MAX);
    fill(vis, vis + N, false);
}

// vis标记过后的点，最短路已经确定了
// 所有的点与源点相连的最短路径，构成了一棵树

void dijkstra() {
    priority_queue<PII, vector<PII>, greater<PII>> heap;
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
    clear();
    cin >> n >> m >> s;
    for (int i = 0; i < m; i++) {
        int u, v, w; cin >> u >> v >> w;
        g[u].push_back({v, w});
    }
    dijkstra();
    for (int i = 1; i <= n; i++) cout << d[i] << " "; cout << '\n';
}

signed main() {
    ios::sync_with_stdio(0); cin.tie(0);
    int T = 1;
    // cin >> T;
    while (T--) solve();
    return 0;
}
```

### 9.1.1. 最短路径树

#### 9.1.1.1. 权值最小的最短路径树

https://codeforces.com/problemset/problem/545/E

```cpp
#include <bits/stdc++.h>
using namespace std;
#define int long long
#define PII pair<int, int>

const int N = 3e5 + 1;
vector<array<int, 3>> g[N];
bool vis[N];
int d[N];
// int pre[N]; 
int pre_id[N]; // 记录当前节点 v 和父节点 u 之间的边的编号
int n, m, s; 

void clear() {
    for (int i = 0; i < N; i++) g[i].clear();
    fill(d, d + N, LLONG_MAX);
    fill(vis, vis + N, false);
    // fill(pre, pre + N, -1);
}

void dijkstra() {
    priority_queue<PII, vector<PII>, greater<PII>> heap;
    d[s] = 0; heap.push({0, s});
    while (!heap.empty()) {
        int u = heap.top().second; heap.pop();
        if (vis[u]) continue;
        vis[u] = true;
        for (auto [v, w, id] : g[u]) {
            // 在最短路相等的情况下
            // 扩展到同一个节点
            // 后出堆的点连的边权值更小
            // u -> v
            if (!vis[v] && d[u] + w <= d[v]) {
                d[v] = d[u] + w;
                // pre[v] = u;
                pre_id[v] = id;
                heap.push({d[v], v});
            }
        }
    }
}

void solve() {
    clear();
    cin >> n >> m;
    vector<int> weight(m + 1);
    for (int i = 1; i <= m; i++) {
        int u, v, w; cin >> u >> v >> w;
        weight[i] = w;
        g[u].push_back({v, w, i});
        g[v].push_back({u, w, i});
    }
    // 求权值最小的最短路径树
    cin >> s;
    dijkstra();
    int sum = 0;
    vector<int> ans;
    for (int v = 1; v <= n; v++) {
        if (v == s) continue;
        ans.push_back(pre_id[v]);
        sum += weight[pre_id[v]];
    }
    cout << sum << '\n';
    for (auto x : ans) cout << x << " "; cout << '\n';
}

signed main() {
    ios::sync_with_stdio(0); cin.tie(0);
    int T = 1;
    // cin >> T;
    while (T--) solve();
    return 0;
}
```

#### 9.1.1.2. 选择 k 条边的最短路径树

https://codeforces.com/problemset/problem/1076/D

```cpp
#include <bits/stdc++.h>
using namespace std;
#define int long long
#define PII pair<int, int>

const int N = 3e5 + 1;
vector<array<int, 3>> g[N];
vector<PII> tree[N];
bool vis[N], vis_tree[N];
int d[N];
int pre[N], pre_id[N];
int n, m, k; 
int cnt = 0;

void clear() {
    for (int i = 0; i < N; i++) g[i].clear();
    fill(d, d + N, LLONG_MAX);
    fill(vis, vis + N, false);
}

void dijkstra() {
    priority_queue<PII, vector<PII>, greater<PII>> heap;
    d[1] = 0; heap.push({0, 1});
    while (!heap.empty()) {
        int u = heap.top().second; heap.pop();
        if (vis[u]) continue;
        vis[u] = true;
        for (auto [v, w, id] : g[u]) {
            if (!vis[v] && d[u] + w < d[v]) {
                d[v] = d[u] + w;
                pre_id[v] = id;
                pre[v] = u;
                heap.push({d[v], v});
            }
        }
    }
}

void dfs(int u) {
    vis_tree[u] = true; cnt++;
    if (cnt == min(n, k + 1)) exit(0);
    for (auto [v, id] : tree[u]) {
        if (!vis_tree[v]) {
            cout << id << " ";
            dfs(v);
        }
    }
}

void solve() {
    clear();
    cin >> n >> m >> k;
    for (int i = 1; i <= m; i++) {
        int u, v, w; cin >> u >> v >> w;
        g[u].push_back({v, w, i});
        g[v].push_back({u, w, i});
    }
    dijkstra();
    // 我们在最短路径树中选择 min(n, k + 1) 个节点
    // 从 1 出发开始找
    for (int v = 2; v <= n; v++) {
        int id = pre_id[v]; // id 为这条边的编号
        int u = pre[v];
        tree[u].push_back({v, id});
        tree[v].push_back({u, id});
    }
    cout << min(n, k + 1) - 1 << '\n';
    dfs(1);
}

signed main() {
    ios::sync_with_stdio(0); cin.tie(0);
    int T = 1;
    // cin >> T;
    while (T--) solve();
    return 0;
}
```

#### 9.1.1.3. 权值最小的最短路径树的数量

https://codeforces.com/problemset/problem/1005/F

```cpp
#include <bits/stdc++.h>
using namespace std;
#define int long long
#define PII pair<int, int>

const int N = 2e5 + 1;
int n, m, k; 
vector<PII> g[N];
vector<int> pre_id[N];
bool vis[N];
int d[N];
int cnt = 0;
int ans = 1;

void bfs() {
    queue<int> q;
    q.push(1);
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (auto [v, id] : g[u]) {
            // 这个位置还没有更新
            // 一旦更新之后就一定满足权值最小的最短路径树
            if (!d[v]) {
                d[v] = d[u] + 1;
                pre_id[v].push_back(id);
                q.push(v);
            } else if (d[v] == d[u] + 1) {
                pre_id[v].push_back(id);
            }
        }
    }
}

void dfs(int v) {
    if (v == n + 1) {
        for (int i = 1; i <= m; i++) cout << vis[i]; cout << '\n';
        cnt++;
        if (cnt == ans) exit(0);
        return;
    } 
    for (auto id : pre_id[v]) {
        vis[id] = true;
        dfs(v + 1);
        vis[id] = false;
    }
}   

void solve() {  
    cin >> n >> m >> k;
    for (int i = 1; i <= m; i++) {
        int u, v; cin >> u >> v;
        g[u].push_back({v, i}); 
        g[v].push_back({u, i});
    }
    bfs();
    for (int i = 2; i <= n; i++) {
        ans *= pre_id[i].size();
        if (ans >= k) {
            ans = k; break;
        }
    }
    cout << ans << '\n';
    dfs(2);
}   

signed main() {
    ios::sync_with_stdio(0); cin.tie(0);
    int T = 1;
    // cin >> T;
    while (T--) solve();
    return 0;
}
```

## 9.2. Floyd

```cpp
#include <bits/stdc++.h>
using namespace std;
#define int long long

const int N = 101;
int d[N][N];
int n, m;

void floyd() {
    for (int k = 1; k <= n; k++) {
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n; j++) {
                if (d[i][k] != LLONG_MAX && d[k][j] != LLONG_MAX &&
                    d[i][k] + d[k][j] < d[i][j]) {
                    d[i][j] = d[i][k] + d[k][j];
                }
            }
        }
    }
}

void solve() {
    cin >> n >> m;
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= n; j++) {
            if (i != j) d[i][j] = LLONG_MAX;
        }
    }
    for (int i = 0; i < m; i++) {   
        int u, v, w; cin >> u >> v >> w;
        d[u][v] = min(d[u][v], w);
        d[v][u] = min(d[v][u], w);
    }
    floyd();
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= n; j++) {
            cout << d[i][j] << " ";
        }
        cout << '\n';
    }
}   

signed main() {
    ios::sync_with_stdio(0); cin.tie(0);
    int T = 1;
    // cin >> T;
    while (T--) solve();
    return 0;
}
```

## 9.3. Spfa

```cpp
#include <bits/stdc++.h>
using namespace std;
#define int long long
#define PII pair<int, int>

const int N = 2e3 + 1;
vector<PII> g[N];
int cnt[N];
int d[N];
bool vis[N];
int n, m;

void clear() {
    for (int i = 1; i < N; i++) {
        g[i].clear();
        cnt[i] = 0;
        d[i] = LLONG_MAX;
        vis[i] = false;
    }
}

// 在队列里为 true，出队列为 false
bool spfa() {
    d[1] = 0;
    queue<int> q;
    q.push(1);
    while (!q.empty()) {
        int u = q.front(); q.pop();
        vis[u] = false;
        for (auto [v, w] : g[u]) {
            // 不能在这判定
            if (d[u] + w < d[v]) {
                d[v] = d[u] + w;
                if (!vis[v]) {
                    cnt[v]++;
                    vis[v] = true;
                    q.push(v);
                    if (cnt[v] >= n) return true; 
                }
            }
        }
    }
    return false;
}

void solve() {  
    clear();
    cin >> n >> m;
    for (int i = 0; i < m; i++) {
        int u, v, w; cin >> u >> v >> w;
        if (w >= 0) g[u].push_back({v, w}), g[v].push_back({u, w});
        else g[u].push_back({v, w});
    }
    cout << (spfa() ? "YES" : "NO") << '\n';
}   

signed main() {
    ios::sync_with_stdio(0); cin.tie(0);
    int T = 1;
    cin >> T;
    while (T--) solve();
    return 0;
}
```

### 9.3.1. 最长路

```cpp
#include <bits/stdc++.h>
using namespace std;
#define int long long
#define PII pair<int, int>

int n, m, s = 1;
vector<vector<PII>> g;
vector<bool> vis;
vector<int> d;

void spfa() {
    vis[s] = true;
    d[s] = 0;
    queue<int> q;
    q.push(s);
    while (!q.empty()) {
        int u = q.front(); q.pop();
        vis[u] = false;
        for (auto [v, w] : g[u]) {
            if (d[u] + w < d[v]) {
                d[v] = d[u] + w;
                if (!vis[v]) {
                    vis[v] = true;
                    q.push(v);
                }
            }
        }
    }
}

void solve() {
    cin >> n >> m;
    g.assign(n + 1, {});
    vis.assign(n + 1, false);
    d.assign(n + 1, LLONG_MAX);
    for (int i = 0; i < m; i++) {
        int u, v, w; cin >> u >> v >> w;
        g[u].push_back({v, -w});
    }
    spfa();
    cout << (d[n] == LLONG_MAX ? -1 : -d[n]) << endl; 
}

signed main() {
    ios::sync_with_stdio(0); cin.tie(0);
    int T = 1;
    // cin >> T;
    while (T--) solve();
    return 0;
}
```

## 9.4. Johnson

**全源最短路径算法**

构造一个超级源点 $0$ ，与每一个节点连上边权为 $0$ 的边，用 $\mathrm{SPFA}$ 求出这个点到其他所有点的最短路，记作 $h_i$。如果有一条从 $u$ 点到 $v$ 点，边权为 $w$ 的边，则我们将该边的边权重新设置为 $w + h_u - h_v$，现在以每个点为起点，跑 $n$ 遍 $\mathrm{Dijkstra}$ 即可求出任意两点间的最短距离。

### 9.4.1. 证明

#### 9.4.1.1. 非负权值证明

<img src="https://img.lunamyth.love/2026/04/1775545852.png">

从 $0$ 到 $v$ 点的最短路要么经过 $u$ 要么不经过 $u$。如果经过 $u$，那么 $h_v = h_u + w$；如果不经过 $u$，那么 $h_v \le h_u + w$，于是得到 $w' = w + h_u - h_v \ge 0$

#### 9.4.1.2. 最短路不变证明

$$
\begin{aligned}
s \rightarrow t 
&= s \rightarrow p_1 \rightarrow p_2 \rightarrow \dots \rightarrow p_k \rightarrow t \\
&= w(s, p_1) + (h_s - h_{p_1}) + w(p_1, p_2) + (h_{p_1} - h_{p_2}) + \dots + w(p_k, t) + (h_{p_k} - h_t) \\
&= w(s, p_1) + w(p_1, p_2) + \dots + w(p_k, t) + h_s - h_t
\end{aligned}
$$

### 9.4.2. 代码实现

时间复杂度：$O(N\cdot MlogM)$

```cpp
#include <bits/stdc++.h>
using namespace std;
#define int long long
#define PII pair<int, int>

const int N = 3e3 + 1;
const int inf = 1e9;

vector<PII> g[N];
bool vis[N];
int d[N][N], cnt[N], h[N];
int n, m;

void clear() {
    for (int i = 0; i <= n; i++) {
        g[i].clear();
        vis[i] = false;
        h[i] = LLONG_MAX;
        cnt[i] = 0;
        for (int j = 0; j <= n; j++) {
            if (i != j) d[i][j] = LLONG_MAX;
        }
    }
}

bool spfa() {
    queue<int> q;
    q.push(0); h[0] = 0;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        vis[u] = false;
        for (auto [v, w] : g[u]) {
            if (h[u] + w < h[v]) {
                h[v] = h[u] + w;
                if (!vis[v]) {
                    q.push(v);
                    vis[v] = true;
                    cnt[v]++;
                    if (cnt[v] >= n) return true; 
                }
            }
        }
    }
    return false; 
}

void dijkstra(int s) {
    for (int i = 0; i <= n; i++) vis[i] = false;
    priority_queue<PII, vector<PII>, greater<PII>> heap;
    d[s][s] = 0;
    heap.push({0, s});
    while (!heap.empty()) {
        int u = heap.top().second; heap.pop();
        if (vis[u]) continue;
        vis[u] = true;
        for (auto [v, w] : g[u]) {
            if (d[s][u] + w < d[s][v]) {
                d[s][v] = d[s][u] + w;
                heap.push({d[s][v], v});
            }
        }
    }
}

void solve() {
    cin >> n >> m;
    clear();
    vector<array<int, 3>> edges(m + n + 1);
    for (int i = 1; i <= m; i++) {
        int u, v, w; cin >> u >> v >> w;
        edges[i] = {u, v, w};
        g[u].push_back({v, w});
    }
    for (int i = 1; i <= n; i++) {
        g[0].push_back({i, 0});
    }
    if (spfa()) { 
        cout << -1 << '\n'; 
        return; 
    }
    for (int i = 1; i <= n; i++) g[i].clear();
    for (int i = 1; i <= m; i++) {
        auto [u, v, w] = edges[i];
        w = w + h[u] - h[v];
        g[u].push_back({v, w});
    }
    for (int i = 1; i <= n; i++) dijkstra(i);
    for (int i = 1; i <= n; i++) {
        int sum = 0;
        for (int j = 1; j <= n; j++) {
            if (d[i][j] == LLONG_MAX) sum += inf * j;
            else sum += j * (d[i][j] - h[i] + h[j]);
        }
        cout << sum << '\n';
    }
}

signed main() {
    ios::sync_with_stdio(0); cin.tie(0);
    int T = 1;
    // cin >> T;
    while (T--) solve();
    return 0;
}
```


# 10. 计算几何

## 10.1. 三角函数

| 函数            | 功能                         |
| ------------- | ------------------------      | 
| `sin(x)`      | 计算 sin(x)                    | 
| `cos(x)`      | 计算 cos(x)                    |
| `tan(x)`      | 计算 tan(x)                    | 
| `asin(x)`     | 求反正弦（返回角度）             | 
| `acos(x)`     | 求反余弦                        | 
| `atan(x)`     | 求反正切                        | 
| `atan2(y, x)` | 返回点 (x, y) 的极角（\[-π, π]） | 

<img src="https://img.lunamyth.love/2026/04/1775545860.png">

## 10.1.1. 角度与弧度的转换

```cpp
const double PI = acos(-1.0); 
double deg_to_rad(double deg) { return deg * PI / 180.0; }
double rad_to_deg(double rad) { return rad * 180.0 / PI; }
```

## 10.1.2. 旋转一个点(绕原点逆时针旋转 θ 弧度)

```cpp
Point rotate(Point p, double theta) {
    return {
        p.x * cos(theta) - p.y * sin(theta),
        p.x * sin(theta) + p.y * cos(theta)
    };
}
```

## 10.1.3. 绕任意点旋转

```cpp
Point rotate(Point p, Point center, double theta) {
    double dx = p.x - center.x;
    double dy = p.y - center.y;
    double x_new = dx * cos(theta) - dy * sin(theta);
    double y_new = dx * sin(theta) + dy * cos(theta);
    return {x_new + center.x, y_new + center.y};
}
```


## 10.1.4. 判断凹凸性

```cpp
#include <bits/stdc++.h>
#define int long long 

void solve() {
    int n; std::cin >> n;
    std::vector<std::array<int, 2>> arr(n);
    for (int i = 0; i < n; i++) {
        std::cin >> arr[i][0] >> arr[i][1];
    }
    for (int i = 0; i < n; i++) {
        auto [x1, y1] = arr[(i - 1 + n) % n];
        auto [x2, y2] = arr[i];
        auto [x3, y3] = arr[(i + 1) % n];
        // a = (x2 - x1, y2 - y1)
        // b = (x3 - x2, y3 - y2)
        int cross = (x2 - x1) * (y3 - y2) - (y2 - y1) * (x3 - x2);
        if (cross < 0) {
            std::cout << "Yes" << '\n';
            return;
        }
    }
    std::cout << "No" << '\n';
}       

signed main() {
    std::ios::sync_with_stdio(0);
    std::cin.tie(0);
    solve();
}
```

# 11. 线段树

## 11.1. 区间增加

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

int n, m;
vector<int> arr;
vector<int> sum;
vector<int> adds;

void up(int i) {
    sum[i] = sum[i * 2] + sum[i * 2 + 1];
}

void build(int l, int r, int i) {
    if (l == r) {
        sum[i] = arr[l];
        return;
    }
    int mid = (l + r) / 2;
    build(l, mid, i * 2);
    build(mid + 1, r, i * 2 + 1);
    up(i);
}

void lazy(int i, int v, int n) {
    sum[i] += n * v;
    adds[i] += v;
}

void down(int i, int ln, int rn) {
    if (adds[i] != 0) {
        lazy(i * 2, adds[i], ln);
        lazy(i * 2 + 1, adds[i], rn);
        adds[i] = 0;
    }
}

int query(int jobl, int jobr, int l, int r, int i) {
    if (jobl <= l && r <= jobr) {
        return sum[i];
    }
    int mid = (l + r) / 2;
    down(i, mid - l + 1, r - mid);
    int ans = 0;
    if (jobl <= mid) {
        ans += query(jobl, jobr, l, mid, i * 2);
    } 
    if (jobr > mid) {
        ans += query(jobl, jobr, mid + 1, r, i * 2 + 1);
    }
    return ans;
}

void add(int jobl, int jobr, int jobv, int l, int r, int i) {
    if (jobl <= l && r <= jobr) {
        lazy(i, jobv, r - l + 1);
        return;
    }
    int mid = (l + r) / 2;
    down(i, mid - l + 1, r - mid);
    if (jobl <= mid) {
        add(jobl, jobr, jobv, l, mid, i * 2);
    }   
    if (jobr > mid) {
        add(jobl, jobr, jobv, mid + 1, r, i * 2 + 1);
    }
    up(i);
}

void solve() {
    cin >> n >> m;
    arr.assign(n + 1, 0);
    sum.assign(4 * n + 1, 0);
    adds.assign(4 * n + 1, 0);
    for (int i = 1; i <= n; i++) cin >> arr[i];
    build(1, n, 1); 
    while (m--) {
        int op; cin >> op;
        if (op == 1) {
            int x, y, k; cin >> x >> y >> k;
            add(x, y, k, 1, n, 1);
        } else {
            int x, y; cin >> x >> y;
            cout << query(x, y, 1, n, 1) << endl;
        }
    }
}  

signed main() {
    ios::sync_with_stdio(0); cin.tie(0);
    int T = 1;
    // cin >> T;
    while (T--) solve();
    return 0;
}
```

## 11.2. 区间修改

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

int n;
vector<int> sum;
vector<int> change;
vector<bool> update;
vector<int> arr;

void up(int i) {
    sum[i] = sum[i * 2] + sum[i * 2 + 1];
}

void build(int l, int r, int i) {
    if (l == r) {
        sum[i] = arr[l];
        return;
    } 
    int mid = (l + r) / 2;
    build(l, mid, i * 2);
    build(mid + 1, r, i * 2 + 1);
    up(i);
}

void lazy(int i, int v, int n) {
    sum[i] = n * v;
    change[i] = v;
    update[i] = true;
}

void down(int i, int ln, int rn) {
    if (update[i]) {
        lazy(i * 2, change[i], ln);
        lazy(i * 2 + 1, change[i], rn);
        update[i] = false;
    }
}

int query(int jobl, int jobr, int l, int r, int i)  {
    if (jobl <= l && r <= jobr) {
        return sum[i];
    }
    int mid = (l + r) / 2;
    int ans = 0;
    down(i, mid - l + 1, r - mid);
    if (jobl <= mid) {
        ans += query(jobl, jobr, l, mid, i * 2);
    }

    if (jobr > mid) {
        ans += query(jobl, jobr, mid + 1, r, i * 2 + 1);
    }
    return ans;
}

void updates(int jobl, int jobr, int jobv, int l, int r, int i) {
    if (jobl <= l && r <= jobr) {
        lazy(i, jobv, r - l + 1);
        return;
    } 
    int mid = (l + r) / 2;
    down(i, mid - l + 1, r - mid); 
    if (jobl <= mid) {
        updates(jobl, jobr, jobv, l, mid, i * 2);
    } 
    if (jobr > mid)  {
        updates(jobl, jobr, jobv, mid + 1, r, i * 2 + 1);
    }
    up(i);
}

void solve() {
    cin >> n;
    sum.assign(4 * n + 1, 0);
    arr.assign(n + 1, 0);
    change.assign(4 * n + 1, 0);
    update.assign(4 * n + 1, false);
    for (int i = 1; i <= n; i++) cin >> arr[i];
    build(1, n, 1);
    int q; cin >> q;
    while (q--) {
        int op; cin >> op;
        if (op == 1) {
            int l, r, v;
            cin >> l >> r >> v;
            updates(l, r, v, 1, n, 1);
        } else {
            int l, r;
            cin >> l >> r;
            cout << query(l, r, 1, n, 1) << endl;
        }
    }
}

signed main() {
    ios::sync_with_stdio(0); cin.tie(0);
    int T = 1; 
    // cin >> T;
    while (T--) solve();
    return 0;
}
```

## 11.3. 区间增加和修改

```cpp
#include <bits/stdc++.h>
using namespace std;
#define int long long

const int N = 1e6 + 1;
int maxn[N << 2];
int add[N << 2];
int change[N << 2];
bool update[N << 2];
int arr[N];

void upMax(int i) {
    maxn[i] = max(maxn[i << 1], maxn[i << 1 | 1]);
}

void lazyAdd(int i, int v, int n) {
    add[i] += v;
    maxn[i] += v;
}

void lazyUpdate(int i, int v, int n) {
    change[i] = v;
    update[i] = true;
    maxn[i] = v;
    add[i] = 0;
}

void down(int i, int ln, int rn) {  
    if (update[i]) {
        lazyUpdate(i << 1, change[i], ln);
        lazyUpdate(i << 1 | 1, change[i], rn);
        update[i] = false;
    }
    if (add[i] != 0) {
        lazyAdd(i << 1, add[i], ln);
        lazyAdd(i << 1 | 1, add[i], rn);
        add[i] = 0;
    }
}

void build(int l, int r, int i) {
    if (l == r) {
        maxn[i] = arr[l];
        return;
    }
    int mid = l + r >> 1;
    build(l, mid, i << 1);
    build(mid + 1, r, i << 1 | 1);
    upMax(i);
}

int query(int jobl, int jobr, int l, int r, int i) {
    if (jobl <= l && r <= jobr) {
        return maxn[i];
    }
    int mid = l + r >> 1;
    down(i, mid - l + 1, r - mid);
    int ans = LLONG_MIN;
    if (jobl <= mid) {
        ans = max(ans, query(jobl, jobr, l, mid, i << 1));
    }
    if (jobr > mid) {
        ans = max(ans, query(jobl, jobr, mid + 1, r, i << 1 | 1));
    }
    return ans;
}

void modifyAdd(int jobl, int jobr, int jobv, int l, int r, int i) {
    if (jobl <= l && r <= jobr) {
        lazyAdd(i, jobv, r - l + 1);
        return;
    }
    int mid = l + r >> 1;
    down(i, mid - l + 1, r - mid);
    if (jobl <= mid) {
        modifyAdd(jobl, jobr, jobv, l, mid, i << 1);
    }
    if (jobr > mid) {
        modifyAdd(jobl, jobr, jobv, mid + 1, r, i << 1 | 1);
    }
    upMax(i);
}

void modifyUpdate(int jobl, int jobr, int jobv, int l, int r, int i) {
    if (jobl <= l && r <= jobr) {
        lazyUpdate(i, jobv, r - l + 1);
        return;
    }
    int mid = l + r >> 1;
    down(i, mid - l + 1, r - mid);
    if (jobl <= mid) {
        modifyUpdate(jobl, jobr, jobv, l, mid, i << 1);
    }
    if (jobr > mid) {
        modifyUpdate(jobl, jobr, jobv, mid + 1, r, i << 1 | 1);
    }
    upMax(i);
}

void solve() {  
    int n, m; cin >> n >> m;
    for (int i = 1; i <= n; i++) cin >> arr[i];
    build(1, n, 1);
    while (m--) {
        int op; cin >> op;
        if (op == 1) {
            int l, r, x; cin >> l >> r >> x;
            modifyUpdate(l, r, x, 1, n, 1);
        } else if (op == 2) {
            int l, r, x; cin >> l >> r >> x;
            modifyAdd(l, r, x, 1, n, 1);
        } else {
            int l, r; cin >> l >> r;
            cout << query(l, r, 1, n, 1) << '\n';
        }
    }
}

signed main() {
    ios::sync_with_stdio(0); cin.tie(0);
    int T = 1;
    // cin >> T;
    while (T--) solve();
    return 0;
}
```

## 11.4. 维护最大值

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

int n;
vector<int> arr;
vector<int> maxn;
vector<int> add;

void up(int i) {
    maxn[i] = max(maxn[i * 2], maxn[i * 2 + 1]); 
}

void build(int l, int r, int i) {
    if (l == r) {
        maxn[i] = arr[l];
        return; 
    }
    int mid = (l + r) / 2;
    build(l, mid, i * 2);
    build(mid + 1, r, i * 2 + 1);
    up(i);
}

void lazy(int i, int v) {
    maxn[i] += v;
    add[i] += v;
}

void down(int i) {
    if (add[i]) {
        lazy(i * 2, add[i]);
        lazy(i * 2 + 1, add[i]);
        add[i] = 0;
    }
}

int query(int jobl, int jobr, int l, int r, int i) {
    if (jobl <= l && r <= jobr) {
        return maxn[i];
    }
    int mid = (l + r) / 2;
    down(i);
    int ans = INT_MIN;
    if (jobl <= mid) {
        ans = max(ans, query(jobl, jobr, l, mid, i * 2));
    } 
    if (jobr > mid) {
        ans = max(ans, query(jobl, jobr, mid + 1, r, i * 2 + 1));
    }
    return ans;
}

void adds(int jobl, int jobr, int jobv, int l, int r, int i) {
    if (jobl <= l && r <= jobr) {
        lazy(i, jobv);
        return;
    }
    int mid = (l + r) / 2;
    down(i);
    if (jobl <= mid) {
        adds(jobl, jobr, jobv, l, mid, i * 2);
    }
    if (jobr > mid) {
        adds(jobl, jobr, jobv, mid + 1, r, i * 2 + 1);
    }
    up(i);
}

void solve() {
    cin >> n;
    arr.resize(n + 1);
    maxn.resize(4 * n + 1);
    add.resize(4 * n + 1);
    for (int i = 1; i <= n; i++) cin >> arr[i];
    build(1, n, 1);
    int q; cin >> q;
    while (q--) {
        int op; cin >> op;
        if (op == 1) {
            int l, r, v;
            cin >> l >> r >> v;
            adds(l, r, v, 1, n, 1);
        } else {
            int l, r;
            cin >> l >> r;
            cout << query(l, r, 1, n, 1) << endl;
        }
    }
}

signed main() {
    ios::sync_with_stdio(0); cin.tie(0);
    int T = 1;
    // cin >> T;
    while (T--) solve();
    return 0;
}
```

# 12. KMP

```cpp
// next: 不包括这个字符，前缀和后缀的最大匹配长度，不包含整体
vector<int> getNext(string s) {
    int m = s.size();
    vector<int> next(m);
    next[0] = -1;
    if (m > 1) next[1] = 0;
    // i 表示当前要求的 next 值的位置
    // cn 表示当前要和前一个字符比对的下标
    int i = 2, cn = 0;
    while (i < m) {
        if (s[i - 1] == s[cn]) {
            next[i++] = ++cn;
        } else if (cn > 0) {
            cn = next[cn];
        } else {
            next[i++] = 0;
        }
    }
    return next;
}

vector<int> kmp(string s1, string s2) {
    int n = s1.size(), m = s2.size(), x = 0, y = 0;
    vector<int> next = getNext(s2 + " ");
    vector<int> ans;
    // s1 中当前比对的位置 x
    // s2 中当前比对的位置 y
    while (x < n) {
        if (y < m && s1[x] == s2[y]) {
            x++; y++;
        } else if (y == 0) {
            x++;
        } else {
            y = next[y];
        }
        if (y == m) {
            ans.push_back(x - y); // 匹配成功
            y = next[y]; // 继续匹配后缀
        }
    }
    return ans;
}

void solve() {     
    string s1, s2; cin >> s1 >> s2;
    vector<int> ans = kmp(s1, s2);
    for (auto x : ans) cout << x + 1 << endl;
    int m = s2.size();
    vector<int> next = getNext(s2 + " ");
    for (int i = 1; i <= m; i++) cout << next[i] << " "; cout << endl;
}
```

# 13. 快速幂

## 13.1. 乘法快速幂

```cpp
// a ^ b % p
int power(int a, int b, int p) {
    int ans = 1;
    while (b > 0) {
        if (b & 1) ans = ans * a % p;
        a = a * a % p;
        b >>= 1;
    }
    return ans;
}
```

## 13.2. 矩阵快速幂

```cpp
const int mod = 1e9 + 7;

/*
    a(n * x)
    b(x * m)
*/

vector<vector<int>> multiply(vector<vector<int>>& a, vector<vector<int>>& b) {
    int n = a.size() - 1;
    int m = b[0].size() - 1;
    int cnt = a[0].size() - 1;
    vector<vector<int>> ans(n + 1, vector<int>(n + 1));
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            for (int k = 1; k <= cnt; k++) {
                ans[i][j] += a[i][k] * b[k][j];
                ans[i][j] %= mod;
            }
        }
    }
    return ans;
}

vector<vector<int>> power(vector<vector<int>>& arr, int k) {
    int n = arr.size() - 1;
    vector<vector<int>> ans(n + 1, vector<int>(n + 1));
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= n; j++) {
            if (i == j) ans[i][j] = 1;
        }
    } 
    while (k > 0) {
        if (k & 1) {
            ans = multiply(ans, arr);
        }
        k >>= 1;
        arr = multiply(arr, arr);
    }
    return ans;
}

void solve() {
    int n, k; cin >> n >> k;
    vector<vector<int>> arr(n + 1, vector<int>(n + 1));
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= n; j++) {
            cin >> arr[i][j];
        }
    }
    vector<vector<int>> ans(n + 1, vector<int>(n + 1));
    ans = power(arr, k);
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= n; j++) {
            cout << ans[i][j] << " ";
        }
        cout << endl;
    }
}
```

# 14. 树状数组

树状数组一般用来维护可差分的信息

## 14.1. 原理

### 14.1.1. 组织

树状数组和原数组等长，树状数组中对应位置的值是原数组中对应位置的最右边界。对应到二进制中，范围为 $[l, r]$，其中 $l = $ 去掉二进制数中最右侧的 $1$，再加上 $1$，$r = i$

### 14.1.2. 获得最右侧的 1

**lowbit**

`x & -x` 等价于 `x & (~x + 1)`

## 14.2. 单点修改，范围查询

```cpp
#include <bits/stdc++.h>
using namespace std;
#define int long long

const int N = 1e6;
int tree[N + 1];
int n, m;

// 获得最右侧 1 的状态
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

// [1, i] 位置的累加和
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

void solve() {
    cin >> n >> m;
    for (int i = 1; i <= n; i++) {
        int x; cin >> x; add(i, x);
    }
    while (m--) {
        int op; cin >> op;
        if (op == 1) {
            int x, k; cin >> x >> k;
            add(x, k);
        } else {
            int x, y; cin >> x >> y;
            cout << range(x, y) << '\n';
        }
    }
}

signed main() {
    ios::sync_with_stdio(0); cin.tie(0);
    int T = 1;
    // cin >> T;
    while (T--) solve();
    return 0;
}
```

## 14.3. 范围修改，单点查询

```cpp
#include <bits/stdc++.h>
using namespace std;
#define int long long

const int N = 5e5;
int tree[N + 2];
int n, m;

int lowbit(int x) {
    return x & -x;
}

// 差分数组中 [l, r] + v 只需要 diff[l] + v, diff[r + 1] - v 
void add(int i, int v) {
    while (i <= n) {
        tree[i] += v;
        i += lowbit(i);
    }
}

// 差分数组中求当前位置的数是多少，只需要求差分数组的前缀和
int sum(int i) {
    int ans = 0;
    while (i > 0) {
        ans += tree[i];
        i -= lowbit(i);
    }
    return ans;
}

void solve() {
    cin >> n >> m;
    for (int i = 1; i <= n; i++) {
        int x; cin >> x;
        add(i, x); add(i + 1, -x);
    }
    while (m--) {
        int op; cin >> op;
        if (op == 1) {
            int x, y, k; cin >> x >> y >> k;
            // 构建差分数组
            add(x, k); add(y + 1, -k);
        } else {
            int x; cin >> x;
            cout << sum(x) << '\n';
        }
    } 
}

signed main() {
    ios::sync_with_stdio(0); cin.tie(0);
    int T = 1;
    // cin >> T;
    while (T--) solve();
    return 0;
}
```

## 14.4. 范围修改，范围查询

对于原始数组 $[a_1,a_2, \cdots, a_n]$，我们需要得到这个数组的一个前缀和信息$[a_1, a_2, \cdots, a_k]$。我们构建出原数组的差分数组，得到$[d_1, d_2, \cdots, d_n]$，有公式：

$$
    \begin{aligned}
    a_1 + a_2 + a_3 + \cdots + a_k 
        &= d_1 + (d_1 + d_2) + (d_1 + d_2 + d_3) + \cdots + (d_1 + \cdots + d_k) \\
        &= kd_1 + (k-1)d_2 + (k-2)d_3 + \cdots (k-(k-1))+ d_k \\
        &= k \sum_{i = 1}^{k}d_i - \sum_{i = 1}^{k}(i-1)d_i
    \end{aligned}
$$

所以我们只需要构建两个差分数组就可以构造出答案

## 14.5. 经典例题

### 14.5.1. 逆序对

```cpp
#include <bits/stdc++.h>
using namespace std;
#define int long long

const int N = 5e5;
int tree[N + 1];
int n;

int lowbit(int x) {
    return x & -x;
}

void add(int i, int v) {
    while (i <= n) {
        tree[i] += v;
        i += lowbit(i);
    }
}

int sum(int i) {
    int ans = 0;
    while (i > 0) {
        ans += tree[i];
        i -= lowbit(i);
    }
    return ans;
}

// >= key 的第一个数
int find(int n, vector<int>& arr, int key) {
    int l = 1, r = n, ans = -1;
    while (l <= r) {
        int mid = (l + r) / 2;
        if (arr[mid] >= key) {
            ans = mid;
            r = mid - 1;
        } else {
            l = mid + 1;
        }
    }
    return ans;
}

void solve() {
    cin >> n;
    vector<int> arr(n + 1);
    for (int i = 1; i <= n; i++) cin >> arr[i];
    vector<int> temp = arr;
    sort(arr.begin() + 1, arr.end());
    int ans = 0;
    // 有一个词频数组
    // 每次查询 sum[1, x - 1]
    // 每次查询结束再把这个数字加入词频数组中
    for (int i = n; i >= 1; i--) {
        int x = find(n, arr, temp[i]);
        ans += sum(x - 1);
        add(x, 1);
    }
    cout << ans << '\n';
}   

signed main() {
    ios::sync_with_stdio(0); cin.tie(0);
    int T = 1;
    // cin >> T;
    while (T--) solve();
    return 0;
}
```

### 14.5.2. 加权逆序对

https://www.luogu.com.cn/problem/T488358

```cpp
#include <bits/stdc++.h>
using namespace std;
#define int long long

const int N = 2e5;
int cnt[N + 1];
int val[N + 1];
int n;

int lowbit(int x) {
    return x & -x;
}

void add(int tree[], int i, int v) {
    while (i <= n) {
        tree[i] += v;
        i += lowbit(i);
    }
}

int sum(int tree[], int i) {
    int ans = 0;
    while (i > 0) {
        ans += tree[i];
        i -= lowbit(i);
    }
    return ans;
}

// >= key 的第一个数
int find(int n, vector<int>& arr, int key) {
    int l = 1, r = n, ans = -1;
    while (l <= r) {
        int mid = (l + r) / 2;
        if (arr[mid] >= key) {
            ans = mid;
            r = mid - 1;
        } else {
            l = mid + 1;
        }
    }
    return ans;
}

void solve() {
    cin >> n;
    vector<int> arr(n + 1);
    for (int i = 1; i <= n; i++) {
        cin >> arr[i];
    }
    vector<int> temp = arr;
    sort(arr.begin() + 1, arr.end());
    int ans = 0;
    for (int i = n; i >= 1; i--) {
        int x = find(n, arr, temp[i]);
        ans += sum(cnt, x - 1) * temp[i] + sum(val, x - 1);
        // 构建逆序对出现的次数的树状数组
        add(cnt, x, 1);
        // 构建值的树状数组
        add(val, x, temp[i]);
    }
    cout << ans << '\n';
}   

signed main() {
    ios::sync_with_stdio(0); cin.tie(0);
    int T = 1;
    // cin >> T;
    while (T--) solve();
    return 0;
}
```

### 14.5.3. 三元上升子序列

```cpp
#include <bits/stdc++.h>
using namespace std;
#define int long long

const int N = 1e5;
int up1[N + 1], up2[N + 1];
int n;

int lowbit(int x) {
    return x & -x;
}

void add(int tree[], int i, int v) {
    while (i <= N) {
        tree[i] += v;
        i += lowbit(i);
    }
}

int sum(int tree[], int i) {
    int ans = 0;
    while (i > 0) {
        ans += tree[i];
        i -= lowbit(i);
    }
    return ans;
}

void solve() {
    /*
        构建两个词频数组
        up1: 以 v 做结尾的上升一元组数量
        up2: 以 v 做结尾的上升二元组数量 sum(up1, v - 1)
        以 v 做结尾的上升三元组的数量 sum(up2, v - 1)
    */
    cin >> n;
    int ans = 0;
    for (int i = 1; i <= n; i++) {
        int v; cin >> v;
        add(up1, v, 1);
        add(up2, v, sum(up1, v - 1));
        ans += sum(up2, v - 1);
    }
    cout << ans << '\n';
}

signed main() {
    ios::sync_with_stdio(0); cin.tie(0);
    int T = 1;
    // cin >> T;
    while (T--) solve();
    return 0;
}
```

# 15. 最近公共祖先 LCA

```cpp
#include <bits/stdc++.h>
using namespace std;
#define int long long

// st[i][p] i 号节点向上跳 2^p 层会到哪个节点

int n, m, s;
const int N = 5e5 + 1, M = 20;
vector<int> g[N];
int deep[N];
int st[N][M];

void dfs(int u, int pre) {
    deep[u] = deep[pre] + 1;
    st[u][0] = pre;
    for (int p = 1; p <= log2(n); p++) {
        st[u][p] = st[st[u][p - 1]][p - 1];
    }
    for (auto v : g[u]) {
        if (v != pre) dfs(v, u);
    }
}

int lca(int a, int b) {
    if (deep[a] < deep[b]) swap(a, b);
    // 跳到同一层
    for (int p = log2(n); p >= 0; p--) {
        if (deep[st[a][p]] >= deep[b]) {
            a = st[a][p];
        }
    }
    if (a == b) return a;
    for (int p = log2(n); p >= 0; p--) {
        if (st[a][p] != st[b][p]) {
            a = st[a][p];
            b = st[b][p];
        }
    }
    return st[a][0];
}

void solve() {
    cin >> n >> m >> s;
    for (int i = 0; i < n - 1; i++) {
        int u, v; cin >> u >> v;
        g[u].push_back(v);
        g[v].push_back(u);
    }
    dfs(s, 0);
    for (int i = 0; i < m; i++) {
        int a, b; cin >> a >> b;
        cout << lca(a, b) << '\n';
    }
}   

signed main() {
    ios::sync_with_stdio(0); cin.tie(0);
    int T = 1;
    // cin >> T;
    while (T--) solve();
    return 0;
}
```

# 16. st 表

## 16.1. 维护最大值最小值

```cpp
#include <bits/stdc++.h>
using namespace std;
#define int long long

const int N = 1e5 + 1;
// pow2[i] 查询 <= i 最大的 2 的幂
int pow2[N];
int arr[N];
// stmax[i][p]
// 连同 i 在内 2^p 长度的最大值
int stmax[N][20];
int stmin[N][20];
int n, m;

void build() {
    pow2[0] = -1;
    for (int i = 1; i <= n; i++) {
        pow2[i] = pow2[i >> 1] + 1;
        stmax[i][0] = arr[i];
        // stmin[i][0] = arr[i];
    }
    for (int p = 1; p <= pow2[n]; p++) {
        // i 循环边界保证长度 2^p 的整段都在数组范围内 
        for (int i = 1; i + (1 << p) - 1 <= n; i++) {
            stmax[i][p] = max(stmax[i][p - 1], stmax[i + (1 << (p - 1))][p - 1]);
            // stmin[i][p] = min(stmin[i][p - 1], stmin[i + (1 << (p - 1))][p - 1]);
        }
    }
}

int query(int l, int r) {
    int p = pow2[r - l + 1];
    int a = max(stmax[l][p], stmax[r - (1 << p) + 1][p]);
    // int b = min(stmin[l][p], stmin[r - (1 << p) + 1][p]);
    return a;
}

void solve() {
    cin >> n >> m;
    for (int i = 1; i <= n; i++) cin >> arr[i];
    build();
    for (int i = 0; i < m; i++) {
        int l, r; cin >> l >> r;
        cout << query(l, r) << '\n';
    }
}

signed main() {
    ios::sync_with_stdio(0); cin.tie(0);
    int T = 1;
    // cin >> T;
    while (T--) solve();
    return 0;
}
```

## 16.2. 维护 gcd

```cpp
#include <bits/stdc++.h>
using namespace std;
#define int long long

const int N = 1001;
int arr[N];
int pow2[N];
int stgcd[N][10];
int n, m;

int gcd(int a, int b) {
    return b ? gcd(b, a % b) : a;
}

void build() {
    pow2[0] = -1;
    for (int i = 1; i <= n; i++) {
        stgcd[i][0] = arr[i];
        pow2[i] = pow2[i >> 1] + 1;
    }
    for (int p = 1; p <= pow2[n]; p++) {
        for (int i = 1; i + (1 << p) - 1 <= n; i++) {
            stgcd[i][p] = gcd(stgcd[i][p - 1], stgcd[i + (1 << (p - 1))][p - 1]);
        }
    }
}

int query(int l, int r) {
    int p = pow2[r - l + 1];
    return gcd(stgcd[l][p], stgcd[r - (1 << p) + 1][p]);
}

void solve() {
    cin >> n >> m;
    for (int i = 1; i <= n; i++) cin >> arr[i];
    build();
    for (int i = 0; i < m; i++) {
        int l, r; cin >> l >> r;
        cout << query(l, r) << '\n';
    }
}

signed main() {
    ios::sync_with_stdio(0); cin.tie(0);
    int T = 1;
    // cin >> T;
    while (T--) solve();
    return 0;
}
```

# 17. 组合数

## 17.1. 定义

$$
    \binom{n}{m} = \frac{n!}{m!(n-m)!} = \frac{n(n-1)(n-2) \cdots (n -m+1)}{m!}
$$

## 17.2. 递推式预处理

$$
    \binom{n}{m} = \binom{n-1}{m} + \binom{n-1}{m-1}
$$

### 17.2.1. 证明

$$
    \begin{aligned}
    \binom{n-1}{m} + \binom{n-1}{m-1}
        &= \frac{(n-1)(n-2)\cdots(n-m)}{m!} + \frac{(n-1)(n-2)\cdots(n-m+1)}{(m-1)!} \\
        &= \frac{(n-1)(n-2)\cdots(n-m)}{m!} + \frac{m(n-1)(n-2)\cdots(n-m+1)}{m!} \\
        &= \frac{(n-m+m)((n-1)(n-2)\cdots(n-m+1))}{m!} \\
        &= \frac{n(n-1)(n-2)\cdots(n-m+1)}{m!} \\
        &= \binom{n}{m}
    \end{aligned}
$$

### 17.2.2. 直观理解

如果有 $n$ 个苹果，我们要从中选取 $ m $ 个。对于其中的一个苹果，要么选它，要么不选它。如果选这个苹果，那只能在剩下的 $ n - 1 $ 个中去选 $ m-1$ 个，就是 $ \binom{n-1}{m-1} $。如果我们不选这个苹果，那么可以在剩下 $ n - 1 $ 个中去选 $ m$ 个，也就是 $ \binom{n-1}{m}$。所以$ \binom{n}{m} = \binom{n-1}{m} + \binom{n-1}{m-1}$

### 17.2.3. 代码实现

```cpp
const int N = 2e3, mod = 1e9 + 7; 
int c[N + 1][N + 1];

void build() {
    for (int i = 0; i <= N; i++) {
        for (int j = 0; j <= i; j++) {
            if (j == 0 || i == j) c[i][j] = 1;
            else c[i][j] = (c[i-1][j] + c[i-1][j-1]) % mod;
        }
    }
}
```

## 17.3. 阶乘和逆元预处理

$$
    \operatorname{inv}(i) \equiv \operatorname{inv}(i+1) \cdot (i + 1)\pmod{p}
$$

### 17.3.1. 证明

由逆元的定义：

$$
\begin{aligned}
    (i + 1)! \cdot \operatorname{inv}(i+1) &\equiv 1 \pmod{p} \\
    i! \cdot \textcolor{orange}{\operatorname{inv}(i+1) \cdot (i+1)} &\equiv 1 \pmod{p} \\
    \operatorname{inv}(i) &\equiv \textcolor{orange}{\operatorname{inv}(i+1) \cdot (i + 1)} \pmod{p}
\end{aligned}
$$

### 17.3.2. 代码实现

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
    fac[0] = inv[0] = fac[1] = 1;
    for (int i = 2; i <= N; i++) fac[i] = fac[i - 1] * i % mod;
    inv[N] = qpow(fac[N], mod - 2);
    for (int i = N - 1; i >= 1; i--) inv[i] = inv[i + 1] * (i + 1) % mod;
}

int C(int n, int m) {
    return fac[n] * inv[n - m] % mod * inv[m] % mod;
}

void solve() {
    int n, m; cin >> n >> m;
    cout << C(n, m) << '\n';
}  
```

## 17.4. 常见组合数恒等式

### 17.4.1. Pascal 恒等式

$$
\binom{n}{k}=\binom{n-1}{k}+\binom{n-1}{k-1}
$$

### 17.4.2. 中心对称

$$
\binom{n}{k}=\binom{n}{n-k}
$$

### 17.4.3. 上下交换（常用来把 k 换到 n）

$$
k\binom{n}{k}=n\binom{n-1}{k-1}
$$

### 17.4.4. Vandermonde 卷积

$$
\sum_{i=0}^{r}\binom{m}{i}\binom{n}{r-i}
=\binom{m+n}{r}
$$

### 17.4.5. 冰球杆恒等式（Hockey-stick）

$$
\sum_{i=r}^{n}\binom{i}{r}=\binom{n+1}{r+1}
$$

### 17.4.6. 全部组合数求和

$$
\sum_{k=0}^{n}\binom{n}{k}=2^n
$$

### 17.4.7. 带符号求和（构造反演时用）

$$
\sum_{k=0}^{n}(-1)^k\binom{n}{k}=0,\quad n\ge1
$$

### 17.4.8. 降维恒等式（常用于消掉“k”）

$$
\sum_{k=r}^{n} \binom{k}{r} = \binom{n+1}{r+1}
$$

### 17.4.9. “m+i” 形式求和（组合数前缀）

$$
\sum_{i=0}^{n} \binom{m+i}{i}
= \binom{m+n+1}{n}
$$

### 17.4.10. 组合卷积（换 r 转换法则）

$$
\binom{n}{k}\binom{k}{r}
= \binom{n}{r}\binom{n-r}{k-r}
$$

### 17.4.11. 二项式反演

$$
g(n)=\sum_{k=0}^{n}\binom{n}{k}f(k)
\quad\Longleftrightarrow\quad
f(n)=\sum_{k=0}^{n}(-1)^{n-k}\binom{n}{k}g(k)
$$

### 17.4.12. Stars and Bars（隔板法）

$$
x_1+x_2+\cdots+x_k=n,\ x_i\ge0
\Rightarrow \binom{n+k-1}{k-1}
$$

### 17.4.13. 隔板法（严格正数）

$$
x_i\ge1 \Rightarrow \binom{n-1}{k-1}
$$

### 17.4.14. 多项式展开

$$
(1+x)^n = \sum_{k=0}^{n} \binom{n}{k}x^k
$$

### 17.4.15. 负参数

$$
\binom{-n}{k}
= (-1)^k \binom{n+k-1}{k}
$$

### 17.4.16. 带系数的恒等式

$$
i\binom{n}{i}=n\binom{n-1}{i-1}
$$

$$
(n-i)\binom{n}{i}=n\binom{n-1}{i}
$$

$$
i^2\binom{n}{i}
= n(n-1)\binom{n-2}{i-2}+n\binom{n-1}{i-1}
$$

$$
i(i-1)\binom{n}{i}=n(n-1)\binom{n-2}{i-2}
$$

$$
i\binom{m+i}{i}=m\binom{m+i-1}{i-1}
$$

$$
(m+i)\binom{m+i}{i}=(m+1)\binom{m+i+1}{i}-m\binom{m+i}{i}
$$

$$
i^{\underline{k}}\binom{n}{i}=n^{\underline{k}}\binom{n-k}{i-k}
$$

## 17.5. Lucas 定理

对于素数 $ p $，有
$$
    \binom{n}{m} \equiv \binom{n \bmod p}{m \bmod p} \binom{\left\lfloor \frac{n}{p} \right\rfloor}{\left\lfloor \frac{m}{p} \right\rfloor} \pmod p
$$
其中，当 $ m > n $ 时，$ \binom{n}{m} $ = 0

### 17.5.1. 代码实现

时间复杂度，$ O(p + T \log_p n)$

```cpp
const int N = 1e5;
int fac[N], inv[N];

int qpow(int a, int b, int p) {
    int ans = 1;
    while (b) {
        if (b & 1) ans = ans * a % p;
        a = a * a % p;
        b >>= 1;
    }
    return ans;
}

void build(int p) {
    fac[0] = inv[0] = fac[1] = 1;
    for (int i = 2; i < p; i++) fac[i] = fac[i - 1] * i % p;
    inv[p - 1] = qpow(fac[p - 1], p - 2, p);
    for (int i = p - 2; i >= 1; i--) inv[i] = inv[i + 1] * (i + 1) % p;   
}

int C(int n, int m, int p) {
    if (m > n) return 0;
    return fac[n] * inv[m] % p * inv[n - m] % p; 
} 

int lucas(int n, int m, int p) {
    if (n < p && m < p) return C(n, m, p);
    return C(n % p, m % p, p) * lucas(n / p, m / p, p) % p;
}

void solve() {
    int n, m, p; cin >> n >> m >> p;
    build(p);
    cout << lucas(n, m, p) << '\n';
}       
```

# 18. 卡特兰数

$$
\begin{aligned}
    & 1, 1, 2, 5, 14, 42, 132, 429, 1430, \dots \\[8pt]
    & f(n) = \binom{2n}{n} - \binom{2n}{n-1} \\[8pt]
    & f(n) = \frac{\binom{2n}{n}}{n + 1} \\[8pt]
    & f(n) = f(n-1) \cdot \frac{4n-2}{n+ 1} \\[8pt]
    & f(n) = \sum_{i=0}^{n-1} f(i) \cdot f(n-1-i)
\end{aligned}
$$


## 18.1. 进出栈模型

进栈顺序规定为 $1, 2, 3, \dots, n$，返回有多少种不同的出栈顺序，可以等价理解为任意前缀的 $\operatorname{cnt}(\text{左括号}) \ge \operatorname{cnt}(\text{右括号})$ ，例如：
$$
(~(~\textcolor{red})~\textcolor{red})~(~(~(~\textcolor{red})~\textcolor{red})~\textcolor{red})
$$
左括号为入栈，右括号为出栈，对应着出栈序列：
$$
2, 1, 5, 4, 3
$$
全部括号组合有 $\binom{2n}{n}$ 种可能性，我们只需要减去违规集合的数量，就是满足条件的集合数量。考虑所有由 $n$ 个左括号和 $n$ 个右括号组成，且存在一个位置 $\operatorname{cnt}(\text{左括号}) < \operatorname{cnt}(\text{右括号})$ 的字符串，所有这样的字符串构成了集合 $A$。考虑所有由 $n-1$ 个左括号和 $n+1$ 个右括号组成的字符串，所有这样的字符串构成了集合 $B$。现在证明：
$$
|A| = |B|    
$$
考虑一种映射关系 $f$，使得 $A$ 中的每一个元素通过 $f$ 可以变换得到 $B$。$f$：把 $A$ 中字符串中第一个 $\operatorname{cnt}(\text{左括号}) < \operatorname{cnt}(\text{右括号})$ 的位置之后的所有括号翻转，所得到的新的字符串与 $B$ 中的元素一一对应。例如：
$$
\begin{aligned}
(~)~)~\textcolor{red}{(~(~(~)~)} \\
(~)~)~\textcolor{blue}{)~)~)~(~(}
\end{aligned}
$$
字符串左半部分的左括号个数为 $k$，右括号个数为 $k+1$，右半部分左括号个数为 $n-k$，右括号个数 $n-k-1$。翻转之后，右半部分左括号的个数为 $n-k-1$，右括号个数 $n-k$，总体 $\operatorname{cnt}(\text{左括号}) = n - 1$，$\operatorname{cnt}(\text{右括号}) = n + 1$。

类似的，我们可以找到一种映射关系 $g$，使得 $B$ 中字符串通过 $g$ 的变换得到 $A$ 中的字符串。$g$：把 $B$ 中字符串中第一个 $\operatorname{cnt}(\text{左括号}) < \operatorname{cnt}(\text{右括号})$ 的位置之后的所有括号翻转，所得到的新的字符串与 $A$ 中的元素一一对应。所以：
$$
|A| \le |B| \quad \text{且} \quad |A| \ge |B| \iff |A| = |B|
$$

# 19. 数论

## 19.1. 逆元

在数论中，如果 $ ab \equiv 1 \pmod{p} $，我们就说在 $a$ 和 $b$ 在模 $p$ 下互为乘法逆元，记作 $a = \operatorname{inv}(b)$

### 19.1.1. 除法同余

1. 必须保证 a / b 可以整除
2. 必须保证 mod 是质数
3. 必须保证 gcd(b, mod) = 1

逆元 inv: `b ^ (mod - 2) % mod`

`a / b % mod = a % mod * inv % mod` 
```cpp
const int mod = 1e9 + 7;

int qpow(int a, int b) {
    int ans = 1;
    while (b > 0) {
        if (b & 1) {
            ans *= a;
            ans %= mod;
        }
        a *= a;
        a %= mod;
        b >>= 1;
    }
    return ans;
}

int inv(int x) {
    return qpow(x, mod - 2);
}

void solve() {
    while (true) {
        int x, y; cin >> x >> y;
        cout << x % mod * inv(y) % mod << endl;
    } 
}
```

### 19.1.2. 连续数字逆元线性递推

在 %mod 意义下
1, 2, 3, ..., n 求每个数的逆元
用 inv[i], 表示 i 的逆元

`inv[1] = 1`
`inv[i] = mod - inv[mod % i] * (mod / i) % mod`

### 19.1.3. 连续阶乘逆元的线性递推

在 %mod 意义下
1!, 2!, 3!, 4!, ..., n!, 求每个数的逆元
用 inv[i], 表示 i 的逆元
先求 n! 乘法同余的结果, 假设为 a, 然后求 a 的逆元, 假设为 b
`fac[0] = 1`
`fac[i] = fac[i - 1] * i % mod`
`inv[n] = b` 
`inv[i] = (i + 1) * inv[i + 1] % mod`

## 19.2. 容斥原理

### 19.2.1. gcd 为 1 的子序列数量

https://codeforces.com/problemset/problem/803/F

```cpp
#include <bits/stdc++.h>
using namespace std;
#define int long long

const int N = 1e5, mod = 1e9 + 7;
int cnt[N + 1];
// pow2[i] 表示 2 ^ i % mod 
int pow2[N + 1];
// dp[i] 表示最大公约数为 i 的子序列的个数
int dp[N + 1];

void solve() {
    int n; cin >> n;
    // 统计每个数字出现的次数
    for (int i = 1; i <= n; i++) {
        int x; cin >> x;
        cnt[x]++;
    }
    pow2[0] = 1;
    for (int i = 1; i <= N; i++) {
        pow2[i] = 2 * pow2[i - 1] % mod;
    }
    for (int i = N; i >= 1; i--) {
        // 统计最大公约数为 i 的子序列个数
        // 比如求最大公约数为 3 的
        // 看 3, 6, 9, 12... 出现的次数
        // 然后求所有非空子集的个数
        int sum = 0;
        for (int j = i; j <= N; j += i) {
            sum += cnt[j];
        }
        dp[i] = (pow2[sum] - 1 + mod) % mod;
        for (int j = 2 * i; j <= N; j += i) {
            dp[i] = (dp[i] - dp[j] + mod) % mod;
        }
    }
    cout << dp[1] << endl;
}

signed main() {
    ios::sync_with_stdio(0); cin.tie(0);
    int T = 1;
    // cin >> T;
    while (T--) solve();
    return 0;
}
```

## 19.3. 裴蜀定理

若 $a, b$ 是整数，且 $\gcd(a, b) = d$，则一定存在整数 $x, y$满足$ax + by = d$

## 19.4. 拓展欧几里得定理

$$ 
ax + py = \gcd(a, p) = 1 
$$

$$ 
ax + py \equiv 1 \pmod{p} 
$$  

$$ 
ax \equiv 1 \pmod{p} 
$$     
    
```cpp
int exgcd(int a, int b, int& x, int& y) {
    if (b == 0) {
        x = 1, y = 0;
        return a;
    }
    int d = exgcd(b, a % b, y, x);
    y -= a / b * x;
    return d;
}

int inv(int a, int p) {
    int x, y;
    if (exgcd(a, p, x, y) != 1) return -1;
    return (x % p + p) % p;
}
```

## 19.5. 费马小定理

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

## 19.6. 欧拉函数

$$
a^b \bmod m = a^{\, (b \bmod \phi(m)) } \bmod m
$$


### 19.6.1. 定义

$ \phi(x) $ 表示为小于 $x$ 但与 $x$ 互质的正整数数量

如 $\phi(12) = 4$，有 $1, 5, 7, 11$ 与之互质

### 19.6.2. 性质


1. 若 $p$ 是质数，那么：
    $$
   \phi(p^n) = p^{n-1}(p-1)
   $$

2. 若 $ a \mid x $，则：
   $$
   \phi(ax) = a \cdot \phi(x)
   $$

3. 若 $ a $ 与 $ b $ 互质，则：
   $$
   \phi(a) \cdot \phi(b) = \phi(ab)
   $$

对于性质1，在小于 $p^{n}$ 的正整数中，不与之互质的只有 $p$的倍数：$p, 2p, 3p,  \cdots, p^{n-1} \cdot p $，共 $p^{n-1}$ 个，所以 $\phi(p^n) = p^n - p^{n - 1} = p^{n-1}(p-1)$

### 19.6.3. 单个正整数的欧拉函数值

$$
    x = p_1^{k_1}p_2^{k_2} \cdots p_n^{k_n} 
$$

所有的 $p_i^{k_i}$ 两两互质，由欧拉函数的性质有：

$$
    \phi(x) = p_1^{k_1-1}(p_1 - 1) \cdot p_2^{k_2 - 1}(p_2 - 1) \cdots p_n^{k_n - 1}(p_n - 1) 
$$

即：

$$
    \phi(x) = x \cdot \frac{p_1 - 1}{p_1} \cdot \frac{p_2 - 1}{p_2} \cdots \frac{p_n - 1}{p_n} 
$$

```cpp
int phi(int n) {
    int ans = n;
    for (int i = 2; i * i <= n; i++) {
        // 如果是质数
        if (n % i == 0) {
            ans = ans / i * (i - 1);
        }
        // 每个质数只处理一次
        while (n % i == 0) {
            n /= i;
        }
    }
    if (n > 1) {
        ans = ans / n * (n - 1);
    }
    return ans;
}
```

### 19.6.4. 用筛法预处理 1 ~ n 的欧拉函数

```cpp
const int N = 1e6;
bool vis[N + 1];
int phi[N + 1];
int primes[N + 1];
int cnt = 0;

void ruler(int n) {    
    phi[1] = 1;
    for (int i = 2; i <= n; i++) {
        if (!vis[i]) {
            primes[cnt++] = i; // 性质 1
            phi[i] = i - 1;
        }
        for (int j = 0; j < cnt; j++) {
            int p = primes[j];
            if (p * i > n) break; 
            vis[p * i] = true;
            if (i % p == 0) {
                phi[i * p] = phi[i] * p; // 性质 2
                break;
            }  
            phi[i * p] = phi[i] * phi[p]; // 性质 3
        }
    }
}
```

