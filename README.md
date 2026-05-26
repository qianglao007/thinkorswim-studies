# ThinkOrSwim Studies

ThinkOrSwim (TOS) 自用 thinkScript 指标合集。

## 指标列表

### FixedRiskPositionSizer.ts — 定额止损仓位计算器

根据固定止损金额和K线振幅，自动计算建议仓位大小。

**核心逻辑：**
```
仓位 = 固定止损金额 ÷ (K线振幅 + 额外缓冲)
```

**参数：**
| 参数 | 默认值 | 说明 |
|------|--------|------|
| riskDollars | 10.0 | 每笔交易最大止损金额 ($) |
| bufferCents | 5.0 | 额外缓冲 (Cents) |

**使用方法：**
1. TOS → Studies → Edit Studies → Create
2. 粘贴 `FixedRiskPositionSizer.ts` 内容
3. OK → Apply
4. 图表左上角出现 Label 标签显示仓位信息
