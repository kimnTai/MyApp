#!/bin/bash

# 執行 expo-doctor，並擷取輸出與退出碼
output=$(npx expo-doctor@latest 2>&1)
exit_code=$?

# 輸出檔案位置
output_file=".expo/expo-doctor.md"
{
  # 根據退出碼加入摘要
  if [ $exit_code -eq 0 ]; then
    echo "✅ **Good news!** We ran Expo Doctor for this PR and everything looks good, Great job!" > "$output_file"
  else
    echo "❌ **Action Required:**  We ran Expo Doctor for this PR and found some issues that need to be addressed. Please review the complete report below 👇" > "$output_file"
    echo >> "$output_file"  # 加入空白行
    echo "\`\`\`shell" >> "$output_file"
    echo "$output" >> "$output_file"
    echo "\`\`\`" >> "$output_file"
  fi
}

# 在終端機顯示原始輸出
echo "$output"

# 回傳原始退出碼
exit $exit_code
