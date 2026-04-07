---
title: ACM-模板（新）
published: 2026-04-07
description: '新整理的模板，不过有许多章节都没有更新'
image: 'https://img.lunamyth.love/2026/04/1775545448.jpg'
tags: [算法, ACM]
category: '模板'
draft: false 
---

# 1. 对拍

## 1.1. 随机数

```cpp
// mt19937：高质量 32 位随机数引擎
std::random_device rd;
std::mt19937 rng(rd()); // 或者直接在里面传入固定种子

int randint(int l, int r) {
    // 使用 uniform_int_distribution 保证生成的随机数在区间内均匀分布
    return std::uniform_int_distribution<int>(l, r)(rng);
}
```

## 1.2. 随机二叉树

```cpp
using pii = std::pair<int, int>;
using vvi = std::vector<std::vector<int>>;

std::random_device rd;
std::mt19937 rng(rd());  

int random(int l, int r) {  
    return std::uniform_int_distribution<int>(l, r)(rng);
} 

struct Node {
    int left = 0;
    int right = 0;
};

// 生成一颗随机二叉树
std::vector<Node> gen_random_binary_tree(int n) {
    std::vector<Node> tree(n + 1);
    std::vector<int> p(n + 1);
    std::iota(p.begin() + 1, p.end(), 1);
    std::shuffle(p.begin() + 2, p.end(), rng); // 保证 1 是根
    for (int i = 2; i <= n; i++) {
        int v = p[i];
        while (true) {
            int u = p[random(1, i - 1)]; // 随机父亲
            // 随机尝试左或右
            if (!tree[u].left && !tree[u].right) {
                if (random(0, 1)) tree[u].left = v;
                else tree[u].right = v;
                break;
            } else if (!tree[u].left) {
                tree[u].left = v;
                break;
            } else if (!tree[u].right) {
                tree[u].right = v;
                break;
            }
            // 如果两个孩子都有，重新选父亲
        }
    }
    return tree;
}

void print_binary_tree(std::vector<Node>& tree) {
    int n = tree.size() - 1;
    for (int u = 1; u <= n; u++) {
        if (tree[u].left) {
            std::cout << u << "->" << tree[u].left << " [label=\"L\"];\n";
            // std::cout << (char)(u + 'a' - 1) << "->" << (char)(tree[u].left + 'a' - 1) << " [label=\"L\"];\n";
        }
        if (tree[u].right) {
            std::cout << u << "->" << tree[u].right << " [label=\"R\"];\n";
            // std::cout << (char)(u + 'a' - 1) << "->" << (char)(tree[u].right + 'a' - 1) << " [label=\"R\"];\n";            
        }

    }
}
```

## 1.3. 随机树

```cpp
using pii = std::pair<int, int>;
using vvi = std::vector<std::vector<int>>; 

std::random_device rd;
std::mt19937 rng(rd());  // 或者直接在里面传入固定种子

int random(int l, int r) {  
    return std::uniform_int_distribution<int>(l, r)(rng);
} 

// 生成一颗随机树
vvi gen_random_tree(int n) {
    vvi g(n + 1);
    std::vector<int> p(n + 1);
    // [1, 2, ..., n]
    std::iota(p.begin() + 1, p.end(), 1);  
    // 打乱（首位为根，这里保留 1 不变，所以根为 1）
    std::shuffle(p.begin() + 2, p.end(), rng);
    for (int i = 2; i <= n; i++) {
        int u = p[random(1, i - 1)]; 
        int v = p[i];
        g[u].push_back(v);
        // g[v].push_back(u);           
    }
    return g;
}

void print_tree(vvi& g) {
    int n = g.size() - 1;
    std::set<pii> s;
    for (int u = 1; u <= n; u++) {
        for (int v : g[u]) {
            s.insert({u, v}); 
            // s.insert({std::min(u, v), std::max(u, v)});
        }
    }
    // for (auto [u, v] : s) std::cout << u << " " << v << '\n';
    for (auto [u, v] : s) std::cout << u << "->" << v << ";\n";
}
```

# 2. 位运算

## 2.1. 基础

- `<<`：左移  
- `>>`：右移  
- `|`：按位或  
- `&`：按位与  
- `^`：按位异或  
- `~`：按位取反（补码形式下，`-x = ~x + 1`）

## 2.2. 示例说明

| 表达式  | 说明       | 结果 | 二进制运算 |
|---------|------------|------|------------|
| `2 << 1` | 左移一位   | `4`  | `0010 → 0100` |
| `8 >> 1` | 右移一位   | `4`  | `1000 → 0100` |
| `5 \| 3` | 按位或     | `7`  | `0101 \| 0011 = 0111` |
| `5 & 3`  | 按位与     | `1`  | `0101 & 0011 = 0001` |
| `5 ^ 3`  | 按位异或   | `6`  | `0101 ^ 0011 = 0110` |
| `~5`     | 按位取反   | `-6` | `~0101 = 1010` |


## 2.3. 常见应用

**把二进制数的第 k 位变成 0**

```cpp
int clear_bit(int num, int k) {
    return num & ~(1 << k);
}
```

**把二进制数的第 k 位变成 1**

```cpp
int set_bit(int num, int k) {
    return num | (1 << k);
}
```

**翻转二进制数的第 k 位**

```cpp
int toggle_bit(int num, int k) {
    return num ^ (1 << k);
}
```

**判断这个数是不是 2 的幂**

```cpp
bool check(int n) {
    return (n & (n - 1)) == 0;
}
```

**输出整数的二进制形式**

```cpp
void solve() {
    int n; std::cin >> n;
    for (int i = 31; i >= 0; i--) {
        if (n >> i & 1) std::cout << 1;
        else std::cout << 0;
    }
}
```

# 3. 技巧 

## 3.1. 遍历得到数组中第 2 大（小）的数

[C. Maximal Intersection](https://codeforces.com/contest/1029/problem/C)

```cpp
#include <bits/stdc++.h>
using namespace std;
#define int long long

void solve() {
    int n; cin >> n;
    vector<int> left(n + 1), right(n + 1);
    int min_r1 = LLONG_MAX, min_r2 = LLONG_MAX;
    int max_l1 = LLONG_MIN, max_l2 = LLONG_MIN;
    for (int i = 1; i <= n; i++) {
        int l, r; cin >> l >> r;
        left[i] = l; right[i] = r;
        // 更新最小和次小 r
        if (r < min_r1) {
            min_r2 = min_r1;
            min_r1 = r;
        } else if (r < min_r2) {
            min_r2 = r;
        }
        // 更新最大和次大 l
        if (l > max_l1) {
            max_l2 = max_l1;
            max_l1 = l;
        } else if (l > max_l2) {
            max_l2 = l;
        }
    }
    // [min_r - max_l]
    int cnt_max_l = 0, cnt_min_r = 0;
    for (int i = 1; i <= n; i++) {
        cnt_max_l += left[i] == max_l1;
        cnt_min_r += right[i] == min_r1;
    }
    int ans = 0;
    for (int i = 1; i <= n; i++) {
        int l = max_l1, r = min_r1;
        if (left[i] == max_l1 && cnt_max_l == 1) {
            l = max_l2;
        }   
        if (right[i] == min_r1 && cnt_min_r == 1) {
            r = min_r2;
        }
        ans = max(ans, r - l);
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

## 3.2. split

按照指定字符分隔

```cpp
std::vector<std::string> split(const std::string& s, char delim) {
    std::vector<std::string> res;
    std::stringstream ss(s);
    std::string token;
    while (std::getline(ss, token, delim)) {
        res.push_back(token);
    }
    return res;
}
```

## 3.3. split_space

按空格分隔

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

## 3.4. trim 

去掉字符串前后空白字符

```cpp
std::string trim(const std::string& s) {
    size_t start = s.find_first_not_of(" \t\r\n");
    if (start == std::string::npos) return ""; 
    size_t end = s.find_last_not_of(" \t\r\n");
    return s.substr(start, end - start + 1);
}
```

# 4. 排序

## 4.1. 选择排序

在 `[i, n - 1]` 位置上，找到最小值并放在 `i` 位置，然后 `[i + 1, n - 1]` 位置上继续

```cpp
void select_sort(std::vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        int min_pos = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[min_pos]) {
                min_pos = j;
            }
        }
        std::swap(arr[i], arr[min_pos]);
    } 
}
```


## 4.2. 冒泡排序

在 `[0, j]` 范围上，相邻位置较大的数滚下去，最大值最终来到 `j` 位置，然后 `[0, j - 1]` 范围上继续

```cpp
void bubble_sort(std::vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j + 1] < arr[j]) {
                std::swap(arr[j + 1], arr[j]);
            }
        } 
    }
}
```

## 4.3. 归并排序

左侧区间有序，右侧区间有序，合并两个区间

```cpp
const int N = 1e5 + 1;
int arr[N];
int help[N];

// 合并两个有序数组
// [l, mid], [mid + 1, r]
void merge(int l, int mid, int r) {
    int pos = l;
    int a = l;        // 左指针
    int b = mid + 1;  // 右指针
    while (a <= mid && b <= r) {
        // 哪个数小拷贝哪个数
        help[pos++] = arr[a] <= arr[b] ? arr[a++] : arr[b++];
    }
    // 拷贝剩下的数字，必有一个越界，一个不越界
    while (a <= mid) {
        help[pos++] = arr[a++];
    }
    while (b <= r) {
        help[pos++] = arr[b++];
    }
    for (int i = l; i <= r; i++) arr[i] = help[i];
}

// [l, r] 上面有序
void merge_sort(int l, int r) {
    if (l == r) return;
    int mid = l + r >> 1;
    merge_sort(l, mid);
    merge_sort(mid + 1, r);
    merge(l, mid, r);
}
```

### 4.3.1. 归并分治

> **原理**：
> 1. 思考一个问题在大范围上的答案是否等于 左部分的答案 + 右范围答案 + 跨越左右产生的答案
> 2. 计算跨越左右产生的答案的时，如果加上左右各自有序这个设定，会不会获得计算的便利性
> 3. 求解过程中只需要加入归并排序的过程即可

#### 4.3.1.1. 小和问题

统计数组中每个位置 $i$ 左侧所有 $\le a_i$ 的数的和，并将这些和累加得到总小和。


[测试链接](https://www.nowcoder.com/questionTerminal/edfe05a1d45c4ea89101d936cac32469)

```cpp
#include <bits/stdc++.h>
#define int long long

const int N = 1e5 + 1;
int arr[N];
int help[N];
int ans = 0;

// [l, mid], [mid + 1, r]
void merge(int l, int mid, int r) {
    // 统计跨区间上有多少小和
    for (int j = mid + 1, i = l, sum = 0; j <= r; j++) {
        while (i <= mid && arr[i] <= arr[j]) {
            sum += arr[i++];
        }
        ans += sum;
    }
    int pos = l;
    int a = l;
    int b = mid + 1;
    while (a <= mid && b <= r) {
        help[pos++] = arr[a] <= arr[b] ? arr[a++] : arr[b++];
    }
    while (a <= mid) {
        help[pos++] = arr[a++];
    }
    while (b <= r) {
        help[pos++] = arr[b++];
    }
    for (int i = l; i <= r; i++) arr[i] = help[i];
}

void merge_sort(int l, int r) {
    if (l == r) return;
    int mid = l + r >> 1;
    merge_sort(l, mid);
    merge_sort(mid + 1, r);
    merge(l, mid, r);
}

void solve() {
    int n; std::cin >> n;
    for (int i = 1; i <= n; i++) std::cin >> arr[i];
    merge_sort(1, n);
    std::cout << ans << '\n';
}   

signed main() {
    std::ios::sync_with_stdio(false); std::cin.tie(nullptr);
    int T = 1;
    // std::cin >> T;
    while (T--) solve();
    return 0;
}
```

#### 4.3.1.2. 翻转对

给定一个数组 `nums` ，如果 `i < j` 且 `nums[i] > 2*nums[j]` 我们就将 `(i, j)` 称作一个重要翻转对。你需要返回给定数组中的重要翻转对的数量

[测试链接](https://leetcode.cn/problems/reverse-pairs/)

```cpp
const int N = 5e4 + 1;
using ll = long long;
ll arr[N];
ll help[N];
ll ans = 0;

// 合并两个有序数组
// [l, mid], [mid + 1, r]
void merge(int l, int mid, int r) {
    ll cnt = 0;
    for (int j = mid + 1, i = l; j <= r; j++) {
        while (i <= mid && arr[i] <= 2 * arr[j]) i++;
        cnt += mid - i + 1;
    } 
    std::cout << cnt << '\n';
    ans += cnt;
    int pos = l;
    int a = l;        // 左指针
    int b = mid + 1;  // 右指针
    while (a <= mid && b <= r) {
        // 哪个数小拷贝哪个数
        help[pos++] = arr[a] <= arr[b] ? arr[a++] : arr[b++];
    }
    // 拷贝剩下的数字，必有一个越界，一个不越界
    while (a <= mid) {
        help[pos++] = arr[a++];
    }
    while (b <= r) {
        help[pos++] = arr[b++];
    }
    for (int i = l; i <= r; i++) arr[i] = help[i];
}

// [l, r] 上面有序
void merge_sort(int l, int r) {
    if (l == r) return;
    int mid = l + r >> 1;
    merge_sort(l, mid);
    merge_sort(mid + 1, r);
    merge(l, mid, r);
}

class Solution {
public:
    int reversePairs(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) arr[i] = nums[i];
        ans = 0;
        merge_sort(0, n - 1);
        return ans;
    }
};
```

## 4.4. 快速排序

对于每一个数，都使得这个数左侧的所有数都比这个数小，右侧所有的数都比这个数大

```cpp
std::mt19937 rmg(std::time(nullptr));

int random(int l, int r) {
    return std::uniform_int_distribution<int>(l, r)(rmg);
}

const int N = 1e5 + 1;
int arr[N];
int lt, gt;

void partition(int l, int r, int x) {
    // lt: < x, gt: > x
    lt = l, gt = r;  
    int pos = l;
    while (pos <= gt) {
        // 相等继续
        if (arr[pos] == x) pos++;   
        // 交换左指针和当前位置的值，左指针++，当前位置++
        else if (arr[pos] < x) std::swap(arr[lt++], arr[pos++]);
        // 交换右指针和当前位置的值，右指针--，当前位置不变（因为当前位置还没有判断大小）
        else std::swap(arr[gt--], arr[pos]);
    }
}

void quick_sort(int l, int r) {
    if (l >= r) return;
    int x = arr[random(l, r)];
    partition(l, r, x);
    // 这里一定要使用临时变量记住 lt 和 gt，因为之后递归的过程中可能值会发生变化
    int left = lt;
    int right = gt;
    quick_sort(l, left - 1);
    quick_sort(right + 1, r); 
}
```

### 4.4.1. 随机选择算法

使用 $O(n)$ 的时间复杂度寻找无序数组中第 $k$ 大的数

## 4.5. 自定义排序

`bool operator()(const T& a, const T& b) const`

### 4.5.1. vector

使用 `sort` 的时候，第三个参数要传入比较器对象

#### 4.5.1.1. 自定义比较器

```cpp
struct Cmp {
    bool operator()(const int& a, const int& b) const {
        return a > b;
    }
};

std::mt19937 rng(std::time(nullptr));

int random(int l, int r) {
    return std::uniform_int_distribution<int>(l, r)(rng);
}

void solve() {
    int n = 10;
    std::vector<int> arr(n + 1);
    for (int i = 1; i <= n; i++) arr[i] = random(1, 20);
    for (int i = 1; i <= n; i++) std::cout << arr[i] << " "; std::cout << '\n';
    sort(arr.begin() + 1, arr.end(), Cmp());
    for (int i = 1; i <= n; i++) std::cout << arr[i] << " "; std::cout << '\n';
}
```

#### 4.5.1.2. C++ 自带比较器

```cpp
sort(arr.begin() + 1, arr.end(), std::greater<int>());
```

#### 4.5.1.3. lambda 函数

```cpp
sort(arr.begin() + 1, arr.end(), [](const int& a, const int& b) {
    return a > b;
});
```

### 4.5.2. set、map、priority_queue

#### 4.5.2.1. 自定义比较器

```cpp
std::mt19937 rng(std::time(nullptr));

int random(int l, int r) {
    return std::uniform_int_distribution<int>(l, r)(rng);
}

struct Cmp {
    bool operator()(const int& a, const int& b) const {
        return a > b;
    }
};

void solve() {
    int n = 10;
    std::multiset<int, Cmp> set;
    std::map<int, int, Cmp> cnt;
    std::priority_queue<int, std::vector<int>, Cmp> heap;
    for (int i = 1; i <= n; i++) {
        int num = random(1, n);
        set.insert(num);
        cnt[num]++;
        heap.push(num);
    }
    for (int x : set) std::cout << x << " "; std::cout << '\n';
    std::cout << "--------------------" << '\n';
    for (auto [k, v] : cnt) {
        std::cout << k << " " << v << '\n';
    }
    std::cout << "--------------------" << '\n';
    std::cout << heap.top() << '\n';
}
```

#### 4.5.2.2. C++ 自带比较器

```cpp
std::multiset<int, std::greater<int>> set;
std::map<int, int, std::greater<int>> cnt;
std::priority_queue<int, std::vector<int>, std::greater<int>> heap;
```

#### 4.5.2.3. lambda 函数

```cpp

std::multiset<int, decltype(cmp)> set;
std::map<int, int, decltype(cmp)> cnt;
std::priority_queue<int, std::vector<int>, decltype(cmp)> heap(cmp);
```

#### 4.5.2.4. 多层嵌套

`vector` 里面嵌套 `priority_queue`

##### 4.5.2.4.1. struct

```cpp
std::mt19937 rng(std::time(nullptr));

int random(int l, int r) {
    return std::uniform_int_distribution<int>(l, r)(rng);
}

using pii = std::pair<int, int>;

struct Cmp {
    bool operator()(const pii& a, const pii& b) const {
        if (a.first != b.first) return a.first < b.first;
        return a.second > b.second;
    }
};

void solve() {
    int n = 10;
    using heap = std::priority_queue<pii, std::vector<pii>, Cmp>;
    std::vector<heap> arr(n + 1);
    for (int i = 1; i <= 50; i++) {
        arr[random(1, n)].push({random(1, n), random(1, n)});
    }
    for (int i = 1; i <= n; i++) {
        if (arr[i].empty()) {
            std::cout << -1 << '\n';
            continue;
        }
        std::cout << "[";
        while (!arr[i].empty()) {
            auto [x, y] = arr[i].top();
            std::cout << "[" << x << ", " << y << "]";
            arr[i].pop();
            if (arr[i].size() > 0) std::cout << ", ";
        }
        std::cout << "]\n";
    }
}
```

##### 4.5.2.4.2. lambda

```cpp
auto cmp = [](const pii& a, const pii& b) {
    if (a.first != b.first) return a.first < b.first;
    return a.second > b.second;
};
using heap = std::priority_queue<pii, std::vector<pii>, decltype(cmp)>;
std::vector<heap> arr(n + 1);
```

# 5. 二分搜索

|      目标      |       条件        |         搜索方向          | 返回  |
| :------------: | :---------------: | :-----------------------: | :---: |
|  第一个 ≥ key  | `arr[mid] >= key` | 收缩右边（`r = mid - 1`） | `pos` |
|  第一个 > key  | `arr[mid] > key`  |         收缩右边          | `pos` |
| 最后一个 < key | `arr[mid] < key`  | 收缩左边（`l = mid + 1`） | `pos` |
| 最后一个 ≤ key | `arr[mid] <= key` |         收缩左边          | `pos` |


$$
\text{最后一个} \le \text{key 的位置}
= \text{第一个} > \text{key 的位置} - 1    
$$

$$
\text{最后一个} < \text{key 的位置}
= \text{第一个} \ge \text{key 的位置} - 1
$$

## 5.1. 查找数组中等于 key 的第一个数

```cpp
int find(vector<int>& arr, int key) {
    int l = 0, r = arr.size() - 1, pos = -1;
    while (l <= r) {
        int mid = l + r >> 1;
        if (arr[mid] == key) r = mid - 1, pos = mid;
        else if (arr[mid] > key) r = mid - 1;
        else l = mid + 1;
    }
    return pos;
}
```

## 5.2. 查找数组中大于等于 key 的第一个数

```cpp
int find(vector<int>& arr, int key) {
    int l = 0, r = arr.size() - 1, pos = -1;
    while (l <= r) {
        int mid = l + r >> 1;
        if (arr[mid] >= key) r = mid - 1, pos = mid;
        else l = mid + 1;
    }
    return pos;
}
```

> `1-based` 同理，查找的范围是 `[l, r]` 

## 5.3. 用 STL 实现二分查找

| 函数名          | 查找条件       | 返回的位置含义                  |
|:----------------:|:------------:|:------------------------------:|
| `lower_bound`   | `>= key`       | 第一个大于等于 `key` 的元素位置   |
| `upper_bound`   | `> key`        | 第一个大于 `key` 的元素位置     |


**0-based**

```cpp
int first_ge(vector<int>& arr, int key) {
    auto it = std::lower_bound(arr.begin(), arr.end(), key);
    return it == arr.end() ? -1 : it - arr.begin();
}
```

```cpp
int first_gt(vector<int>& arr, int key) {
    auto it = std::upper_bound(arr.begin(), arr.end(), key);
    return it == arr.end() ? -1 : it - arr.begin();
}
```

```cpp
int last_lt(vector<int>& arr, int key) {
    return std::lower_bound(arr.begin(), arr.end(), key) - arr.begin() - 1;
}
```

```cpp
int last_le(vector<int>& arr, int key) {
    return std::upper_bound(arr.begin(), arr.end(), key) - arr.begin() - 1;
}
```

**1-based**

```cpp
int first_ge(vector<int>& arr, int key) {
    auto it = std::lower_bound(arr.begin() + 1, arr.end(), key);
    if (it == arr.end()) return -1;
    return it - arr.begin();
}
```

```cpp
int first_gt(vector<int>& arr, int key) {
    auto it = std::upper_bound(arr.begin() + 1, arr.end(), key);
    if (it == arr.end()) return -1;
    return it - arr.begin();
}
```

```cpp
int last_lt(vector<int>& arr, int key) {
    auto it = std::lower_bound(arr.begin() + 1, arr.end(), key);
    int pos = (it - arr.begin()) - 1;  
    return pos >= 1 ? pos : -1;
}
```

```cpp
int last_le(vector<int>& arr, int key) {
    auto it = std::upper_bound(arr.begin() + 1, arr.end(), key);
    int pos = (it - arr.begin()) - 1;
    return pos >= 1 ? pos : -1;
}
```

## 5.4. 容器方法使用二分查找

STL 中的有序容器（`set`、`map`、`multiset` 和 `multimap`）内部使用红黑树，并提供了与二分查找语义完全相同的成员函数：

- `.lower_bound(key)` —— 返回第一个 `>= key` 的迭代器
- `.upper_bound(key)` —— 返回第一个 `> key` 的迭代器


## 5.5. 峰值问题

https://leetcode.cn/problems/find-peak-element/

```cpp
class Solution {
public:
    int findPeakElement(vector<int>& arr) {
        int n = arr.size();
        if (n == 1) return 0;
        // 0 是峰值点
        if (arr[0] > arr[1]) return 0;
        // n - 1 是峰值点
        if (arr[n - 1] > arr[n - 2]) return n - 1;
        // 0: ↑, n-1: ↓
        // [0, n-1] 之间必然存在一个峰值点
        int l = 1, r = n - 2;
        while (l <= r) {
            int mid = l + r >> 1;
            // mid: ↓
            if (arr[mid - 1] > arr[mid]) {
                r = mid - 1;
            // mid: ↑
            } else if (arr[mid] < arr[mid + 1]) {
                l = mid + 1;
            } else {
                return mid;
            }
        }
        return -1;
    }
};
```

# 6. 树

## 6.1. 二叉树

### 6.1.1. 二叉树的三种序

**先序**：任何一颗子树都满足 **中左右**

**中序**：任何一颗子树都满足 **左中右**

**后序**：任何一颗子树都满足 **左右中**

```cpp
std::string s1, s2, s3;

void dfs(int u, std::vector<Node>& tree) {
    if (!u) return;
    s1 += u + 'a' - 1;
    dfs(tree[u].left, tree);
    s2 += u + 'a' - 1;
    dfs(tree[u].right, tree);
    s3 += u + 'a' - 1;
}

void solve() {
    int n = 10;
    std::vector<Node> tree = gen_random_binary_tree(n);
    print_binary_tree(tree);
    dfs(1, tree);
    std::cout << s1 << '\n';
    std::cout << s2 << '\n';
    std::cout << s3 << '\n';
}   
```

### 6.1.2. 二叉树层序遍历

```cpp
vvi bfs(std::vector<Node>& tree) {
    std::queue<pii> q;
    q.push({1, 0});
    vvi ans(tree.size());
    while (!q.empty()) {
        auto [u, deep] = q.front(); q.pop();
        ans[deep].push_back(u);
        if (tree[u].left) {
            q.push({tree[u].left, deep + 1});
        } 
        if (tree[u].right) {
            q.push({tree[u].right, deep + 1});
        }
    }
    return ans;
}
```

### 6.1.3. 二叉树最大宽度

```cpp
int bfs(std::vector<Node>& tree) {
    std::queue<pii> q;   // {节点编号, 完全二叉树位置编号}
    q.push({1, 1});
    int ans = 0;
    while (!q.empty()) {
        int sz = q.size();
        int min_pos = LLONG_MAX;
        int max_pos = LLONG_MIN;
        while (sz--) {
            auto [u, pos] = q.front();
            q.pop();
            // 统计本层最左、最右位置
            min_pos = std::min(min_pos, pos);
            max_pos = std::max(max_pos, pos);
            // 下一层
            if (tree[u].left) q.push({tree[u].left, pos * 2});
            if (tree[u].right) q.push({tree[u].right, pos * 2 + 1});
        }
        ans = std::max(ans, max_pos - min_pos + 1);
    }
    return ans;
}
```

### 6.1.4. 序列化和反序列化

```cpp
std::string str;

// 序列化
void dfs1(int u, std::vector<Node>& tree) {
    if (!u) {
        str += ", #";
        return;
    }
    if (u == 1) str += "1";
    else str += ", " + std::to_string(u); 
    dfs1(tree[u].left, tree);
    dfs1(tree[u].right, tree);
}

int pos = 0;

// 反序列化
void dfs2(int u, std::vector<std::string>& arr, std::vector<Node>& tree) {
    if (pos >= arr.size()) return;
    if (arr[pos] == "#") {
        tree[u].left = 0;
        pos++;
    } else {
        int v = std::stoi(arr[pos++]);
        tree[u].left = v;
        dfs2(v, arr, tree); 
    }
    // 可能越界，再判断一次
    if (pos >= arr.size()) return;
    if (arr[pos] == "#") {
        tree[u].right = 0;
        pos++;
    } else {
        int v = std::stoi(arr[pos++]);
        tree[u].right = v;
        dfs2(v, arr, tree); 
    }
}

void solve() {
    int n = 10;
    std::vector<Node> tree = gen_random_binary_tree(n);
    print_binary_tree(tree);
    dfs1(1, tree);
    std::cout << str << '\n';
    std::vector<std::string> arr = split(str, ',');
    std::vector<Node> new_tree(n + 1);
    dfs2(1, arr, new_tree);
    print_binary_tree(new_tree);
} 
```

### 6.1.5. 知道中序和后序求先序

同样的，如果我们知道了先序和中序，只用在两次递归结束的时候输出 `root` 就行

```cpp
void dfs(std::string mid, std::string after) {
    if (after.empty()) return;
    char root = after.back();
    std::cout << root;
    int pos = mid.find(root);
    // 中序：左根右
    // 后序：左右根
    // 左子树递归
    dfs(mid.substr(0, pos), after.substr(0, pos));
    // 右子树递归
    // len = (size - 1 - 1) - pos + 1
    dfs(mid.substr(pos + 1), after.substr(pos, after.size() - pos - 1));
}

void solve() {
    std::string mid, after; std::cin >> mid >> after;
    dfs(mid, after);
}   
```

### 6.1.6. 普通二叉树的最近公共祖先

```cpp
// p 和 q 的最近公共祖先
int lca(int u, std::vector<Node>& tree, int p, int q) {
    if (!u || u == p || u == q) {
        return u;
    }
    // 是否在左子树
    int L = lca(tree[u].left, tree, p, q);
    // 是否在右子树
    int R = lca(tree[u].right, tree, p, q);
    if (L && R) return u;
    return L ? L : R;
}
```

# 7. 栈

## 7.1. 最小栈

```cpp
class MinStack {
public:
    std::stack<int> stk;
    std::stack<int> min_stk;

    void push(int x) {
        stk.push(x);
        if (min_stk.empty() || x <= min_stk.top()) {
            min_stk.push(x);
        } else {
            min_stk.push(min_stk.top()); 
        }
    }

    void pop() {
        stk.pop();
        min_stk.pop();
    }

    int top() {
        return stk.top();
    }

    int getMin() {
        return min_stk.top();
    }
};
```
