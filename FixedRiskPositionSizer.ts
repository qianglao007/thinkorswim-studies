# ============================================================
# 定额止损仓位计算器 (ThinkOrSwim 版)
# Fixed-Risk Position Sizer
#
# 功能：根据固定止损金额和K线振幅，自动计算建议仓位大小
# 用法：粘贴到 TOS → Studies → Edit Studies → Create → thinkScript Editor
# ============================================================

declare upper;

# --- 输入参数 ---
input riskDollars = 10.0;   # 固定止损金额 ($)
input bufferCents = 5.0;    # 额外缓冲 (Cents)

# --- 内部变量 ---
def buffer = bufferCents / 100;

# --- 当前K线计算 ---
def curRange = high - low;
def curStop  = curRange + buffer;
def curSize  = if curStop > 0 then Round(riskDollars / curStop, 0) else 0;

# --- 前一根K线计算 ---
def prevRange = high[1] - low[1];
def prevStop  = prevRange + buffer;
def prevSize  = if prevStop > 0 then Round(riskDollars / prevStop, 0) else 0;

# --- Label 显示 ---
AddLabel(yes,
    " 前一K线 | 振幅: $" + Round(prevRange, 4) +
    " | 止损距离: $" + Round(prevStop, 4) +
    " | 仓位: " + Round(prevSize, 0) + " 股 ",
    Color.CYAN);

AddLabel(yes,
    " 当前K线 | 振幅: $" + Round(curRange, 4) +
    " | 止损距离: $" + Round(curStop, 4) +
    " | 仓位: " + Round(curSize, 0) + " 股 ",
    Color.GREEN);

AddLabel(yes,
    " 风险: $" + Round(riskDollars, 2) +
    " | 缓冲: " + Round(bufferCents, 0) + " 分 ",
    Color.GRAY);

# --- Plot（隐藏，可用于 Watchlist/Custom Column）---
plot Data = curSize;
Data.SetDefaultColor(Color.GREEN);
Data.SetPaintingStrategy(PaintingStrategy.LINE);
Data.SetLineWeight(1);
Data.Hide();
