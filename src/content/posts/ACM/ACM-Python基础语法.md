---
title: ACM-Python基础语法
published: 2026-04-08
updated: 2026-04-11
description: '基于 Gemini 的适用于算法竞赛的 Python 语法整理'
image: 'https://img.lunamyth.love/2026/04/1775658217.jpg'
tags: [Python, ACM]
category: '指南'
draft: false 
---

> 封面图片来源：[やがて君になる：ポテトマッシャー](https://x.com/potatomassya/status/2041071302480629996?s=20)

# C++ STL 对应的 Python 实现

在算法竞赛（ACM/OI）中，Python 内置的数据结构和库函数完全可以覆盖 C++ STL 的绝大多数功能。

## 1. 线性容器与字符串

**`std::vector` $\rightarrow$ `list`**
Python 的列表底层实现是动态数组。
* `push_back(x)` $\rightarrow$ `a.append(x)`，时间复杂度 $O(1)$。
* `pop_back()` $\rightarrow$ `a.pop()`，时间复杂度 $O(1)$。
* `clear()` $\rightarrow$ `a.clear()`。
* 初始化大小为 $N$ 且全为 0 的数组：`a = [0] * N`。

**`std::string` $\rightarrow$ `str`**
Python 的字符串是 **不可变（Immutable）** 的。
* **避坑：** 切勿在循环中用 `s += "a"` 拼接，会导致 $O(N^2)$ 的时间复杂度。
* **正确做法：** 使用列表收集字符，最后用 `"".join(a)` 合并。

**`std::pair` / `std::tuple` $\rightarrow$ `tuple`**
Python 原生支持元组，且自带字典序比较，非常适合打包坐标或状态。
* `make_pair(1, 2)` $\rightarrow$ `(1, 2)`。

---

## 2. 栈与队列

**`std::stack` $\rightarrow$ `list`**
直接使用 `list` 模拟栈。
* `push(x)` $\rightarrow$ `st.append(x)`
* `top()` $\rightarrow$ `st[-1]`
* `pop()` $\rightarrow$ `st.pop()`

**`std::queue` $\rightarrow$ `collections.deque`**
**绝对不能用 `list` 模拟队列！**（`list.pop(0)` 是 $O(N)$）。必须使用双端队列 `deque`。
```python
from collections import deque
q = deque()
q.append(x)    # push
q[0]           # front
q.popleft()    # pop，时间复杂度 O(1)
```

**`std::priority_queue` $\rightarrow$ `heapq`**
Python 只有操作列表的堆算法库，**默认是小根堆**。
```python
import heapq
pq = []
heapq.heappush(pq, x)  # push
pq[0]                  # top (最小值)
heapq.heappop(pq)      # pop
```
* **大根堆实现：** 存入元素时乘 `-1`，取出时再乘回 `-1`。
* **自定义排序：** 存入元组 `heapq.heappush(pq, (cost, node))`，默认按第一个元素排序。

---

## 3. 关联容器

> **核心差异：** C++ `map/set` 底层是红黑树（增删改查 $O(\log N)$，有序）；Python `dict/set` 底层是哈希表（增删改查 $O(1)$，无序）。

**`std::set` $\rightarrow$ `set`**
* `insert(x)` $\rightarrow$ `s.add(x)`
* `count(x)` $\rightarrow$ `x in s`
* `erase(x)` $\rightarrow$ `s.discard(x)`（不存在时不报错，比 `remove` 安全）。

**`std::map` $\rightarrow$ `dict`**
**1. 底层差异**
* **C++ `map`**：红黑树，**自带按 Key 排序**，$O(\log N)$。
* **Python `dict`**：哈希表，**无序**，$O(1)$（完全等价于 `unordered_map`）。

**2. 致命防坑 (KeyError)**
* C++：`m[k]++` （键不存在会自动建一个 0，不报错）。
* Python：`d[k] += 1` （键不存在**直接崩溃 RE**）。

**3. 竞赛防报错“三板斧”**
* **统计次数 (默认 0)：** `from collections import defaultdict`; `d = defaultdict(int)`
* **图论建边 (默认 [])：** `from collections import defaultdict`; `adj = defaultdict(list)`
* **极速查词频：** `from collections import Counter`; `cnt = Counter(arr)`

**4. 遍历与排序**
* **遍历键和值：** `for k, v in d.items():`
* **按 Key 排序：** 字典无法动态排序，只能全拿出来排：`sorted(d.items())`

---

## 4. 常用算法

**`std::sort` $\rightarrow$ `list.sort()` 或 `sorted()`**
* 降序：`a.sort(reverse=True)` （纯 C 底层实现，比用 lambda 更快）。
* **多关键字排序：**
  利用 Python 元组自动“从左到右”字典序比较的特性，结合 `lambda` 表达式，可以优雅解决 95% 的多关键字问题。
  ```python
  # 假设 a 是一个包含多个元素的列表：[[id, score, time], ...]
  a = [[1, 90, 5], [2, 90, 3], [3, 80, 10]]
  
  # 需求：先按 score 降序，score 相同按 time 升序，time 相同按 id 升序
  a.sort(key=lambda x: (-x[1], x[2], x[0]))
  print(a) # 结果: [[2, 90, 3], [1, 90, 5], [3, 80, 10]]
  ```

* **自定义比较器：**
  当排序规则无法简单地映射为几个权值（例如经典的“将数组拼接成最大的数字”问题），就需要引入 `functools.cmp_to_key` 来完全模拟 C++ 里的 `cmp` 函数。
  ```python
  from functools import cmp_to_key

  def compare(x, y):
      # 返回负数 (-1): 代表 x 应该排在 y 前面
      # 返回正数 ( 1): 代表 y 应该排在 x 前面
      # 返回 0: 代表 x 和 y 相等
      
      str_x, str_y = str(x), str(y)
      if str_x + str_y > str_y + str_x:
          return -1
      else:
          return 1

  nums = [3, 30, 34, 5, 9]
  nums.sort(key=cmp_to_key(compare))
  print(nums) # 结果: [9, 5, 34, 3, 30]
  ```

**`std::lower_bound` / `std::upper_bound` $\rightarrow$ `bisect`**
```python
import bisect
a = [1, 2, 2, 4, 5]
idx1 = bisect.bisect_left(a, 2)  # lower_bound: 返回 1
idx2 = bisect.bisect_right(a, 2) # upper_bound: 返回 3
```

**`std::next_permutation` $\rightarrow$ `itertools.permutations`**
```python
from itertools import permutations
for p in permutations([1, 2, 3]):
    pass # p 是元组
```

---

# Python 字符串操作

## 1. 不可变性
**Python 的字符串是不可变的！** 你绝对不能像 C++ 那样直接写 `s[0] = 'a'`。任何对字符串的修改（替换、拼接）都不会在原地址操作，而是会在内存中生成一个**全新的字符串**。

## 2. 字符串切片
语法：`s[start : end : step]` (左闭右开区间 `[start, end)`)

* `s[2:5]`：截取索引 2 到 4 的子串。
* `s[:3]`：截取前 3 个字符（等价于 `s[0:3]`）。
* `s[3:]`：从索引 3 截取到末尾。
* `s[-1]`：获取最后一个字符（负数索引表示从右往左数）。
* **`s[::-1]`**：**字符串翻转**

## 3. 查、分、合

### A. 查找与统计
* `sub in s`：判断 `sub` 是否是 `s` 的子串，返回 `True/False`。
* `s.find(sub)`：返回子串第一次出现的起始索引，**找不到返回 `-1`**

### B. 分割与拼接
* **`s.split(sep)`**：按 `sep` 分割字符串。
  * 如果不传参数 `s.split()`，它会自动按空格、换行、制表符分割，并**自动过滤掉中间连续的空白符**。
* **`sep.join(iterable)`**：将列表拼成字符串。
  * 🔴 在循环里用 `s += "a"` 拼接百万级字符串，会导致每次都重新分配内存，复杂度退化为 $O(N^2)$，必 TLE。
  * 🟢 `tmp = []; tmp.append("a"); res = "".join(tmp)`，复杂度为 $O(N)$。

### C. 清理空白符
* **`s.strip()`**：去除首尾的所有空白字符（空格、`\n`、`\r`、`\t`）。
* **`s.rstrip('\r\n')`**：只去除右侧换行符（**极其重要！在使用 `sys.stdin.readline` 读单个字符串防 WA 必备**）。

## 4. 字符与 ASCII 码转换
对应 C++ 中的 `s[i] - 'a'` 逻辑。

* **`ord(char)`**：字符转 ASCII 数值。例如 `ord('A')` 返回 `65`。
* **`chr(int)`**：ASCII 数值转字符。例如 `chr(97)` 返回 `'a'`。

## 5. 字符串的修改与排序

### 模拟 C++ 的单点修改
如果你需要频繁修改字符串中的某个字符（比如模拟题），必须先转成 `list`，修改完再拼回去：
```python
lst = list(s)       # "abc" -> ['a', 'b', 'c']
lst[1] = 'x'        # ['a', 'x', 'c']
s = "".join(lst)    # "axc"
```

### 字符串排序
Python 的字符串没有自带的 `.sort()` 方法。
```python
s = "dcba"
# sorted(s) 会对可迭代对象排序，并返回一个列表: ['a', 'b', 'c', 'd']
s = "".join(sorted(s)) # 重新拼回字符串: "abcd"
```

## 6. 高效格式化输出
Python 3.6+ 引入，运行速度最快，写题调试必备。

```python
ans = 123
pi = 3.14159
print(f"Result: {ans}")        # 基础变量替换
print(f"{ans:05d}")            # 补零占位，输出: 00123 
print(f"{pi:.2f}")             # 保留两位小数，输出: 3.14
```

# 代码示例

## Python 模板

```py
import sys
import math
import heapq
from random import randint
from functools import cmp_to_key
from collections import defaultdict, deque
from itertools import permutations, combinations

input = sys.stdin.readline
sys.setrecursionlimit(10**7)

def I(): return input().strip()
def II(): return int(I())
def MII(): return map(int, I().split())
def LII(): return list(MII())

def solve():
	for line in sys.stdin:
		print(line)
	pass

if __name__ == "__main__":
    T = 1
    # T = II()
    for _ in range(T):
        solve()
```

## set

```py
def solve():
    n = II()
    ans = sorted(set(MII()))
    print(len(ans))
    print(*ans)
```

## dict

```py
from collections import defaultdict

def solve():
    n = II()
    cnt = defaultdict(int)
    for _ in range(n):
        x = II()
        cnt[x] += 1
    ans = sorted(cnt.keys())
    outs = [f"{k} {cnt[k]}" for k in ans]
    print("\n".join(outs))
```

## dijkstra

```py
import heapq
N = 10**5 + 1
inf = 10**18
d = [inf for _ in range(N)]
vis = [False for _ in range(N)]
g = [[] for _ in range(N)]

def dijkstra(s):
    heap = [(0, s)]
    d[s] = 0
    while (heap):
        u = heapq.heappop(heap)[1]
        if vis[u]: continue
        vis[u] = True
        for v, w in g[u]:
            if not vis[v] and d[u] + w < d[v]:
                d[v] = d[u] + w
                heapq.heappush(heap, (d[v], v))

def solve():
    n, m, s = MII()
    for _ in range(m):
        u, v, w = MII()
        g[u].append((v, w))
    dijkstra(s)
    print(*d[1:n+1])
```

## combinations

```py
from itertools import combinations

def solve():
    n, k = MII()
    arr = range(1, n + 1)
    ans = []
    for p in combinations(arr, k):
        line = [f"{x:3}" for x in p]
        ans.append("".join(line))
    print("\n".join(ans))
```

## permutations

```py
from itertools import permutations

def solve():
    n = II()
    arr = range(1, n + 1)
    ans = []
    for p in permutations(arr):
        s = []
        for x in p:
            s.append(f"{x:5}")
        ans.append("".join(s))
    print("\n".join(ans))
```