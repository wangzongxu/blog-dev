---
title: esLint入门
categories:
- 代码风格
tags:
- 代码风格
---
### esLint入门
ESLint是用于识别和报告ECMAScript / JavaScript代码书写风格的工具，目的是使代码更加一致并避免错误。 在许多方面，它与JSLint和JSHint类似，但有一些例外：
<!-- more -->
这里只介绍基本使用各规则，详细可去[官方文档](http://eslint.org/)
<img src="http://eslint.org/img/logo.svg" width="200" alt="" align="center"/>
- ESLint使用[Espree](https://github.com/eslint/espree)进行JavaScript解析。
- ESLint使用AST来评估代码中的模式。
- ESLint配置灵活，每个规则都是一个插件，您可以在运行时添加更多。

#### 安装和使用
有两种方法来安装ESLint：全局和本地。

##### 本地安装和使用
如果要将ESLint作为项目构建系统的一部分，我们建议您在本地进行安装。 你可以使用npm：

```bash
npm install eslint --save-dev
```

然后应该初始化一个配置文件：

```bash
./node_modules/.bin/eslint --init
```

之后，您可以在任何文件或目录下运行ESLint，如下所示：

```bash
./node_modules/.bin/eslint yourFile.js
```

您使用的任何插件或可共享配置也必须在本地安装以与本地安装的ESLint配合使用。

##### 全局安装和使用

安装

```bash
npm install -g eslint
```

初始化

```bash
eslint --init
```

运行

```bash
eslint yourFile.js
```

> eslint --init只在根据每个项目设置和配置ESLint，并将ESLint及其插件的本地安装运行在运行的目录中。 如果您希望使用ESLint的全局安装，则配置中使用的任何插件也必须全局安装。

#### 配置
> 如果你是1.0.0之前的版本，请参阅 [migration guide](http://eslint.org/docs/user-guide/migrating-to-1.0.0).

运行eslint --init后，您的目录中将有一个.eslintrc文件。 在其中，您将看到一些如下配置的规则:

```json
{
    "rules": {
        "semi": ["error", "always"],
        "quotes": ["error", "double"]
    }
}
```
属性名“semi”和“quotes”是ESLint中规则的名称。 数组的第一个值是规则的错误级别，可以是以下值之一：
- "off" 或 0 是关闭规则
- "warn" 或 1 将规则作为警告（不影响退出代码）
- "error" 或 2 将规则作为错误（退出代码）

这三个错误级别允许您细分控制ESLint应用规则（有关更多配置选项和详细信息，请参阅[配置文档](http://eslint.org/docs/user-guide/configuring)）。

你的 .eslintrc 配置文件将会包含下列选项：
```json
 "extends": "eslint:recommended"
```
由于这一行，规则页面上标记为“yes”的所有规则将被打开。 或者，您可以通过在npmjs.com上搜索“eslint-config”来使用其他人创建的配置，例如[Airbnb JavaScript Style Guide](https://github.com/sivan/javascript-style-guide/blob/master/es5/README.md)、[standard](https://github.com/feross/standard/blob/master/docs/README-zhtw.md)。 ESLint不会删除您的代码，除非您从共享配置中扩展或在配置中明确地打开规则。

### 规则:rules
ESLint中的规则按类别分组，以帮助您了解其目的。
> 默认情况下不启用任何规则。 配置文件中的“extends”：“eslint：recommended”属性可以启用报告常见问题的规则，下面有一个为 "yes" 的复选标记。

命令行加上--fix选项会自动修复下面有扳手 "fix" 的规则报告的问题（目前大部分为空格）。
```bash
eslint yourFile.js --fix
```

#### 可能导致的错误

这些规则与JavaScript代码中可能的语法或逻辑错误有关：

eslint:recommended | 可被修复 | 名称 | 描述
---|---
x | x | no-await-in-loop | 不允许在循环内使用await
x | x | no-compare-neg-zero | 不允许与-0比较
yes | x | no-cond-assign | 在条件表达式中禁止使用赋值运算符
yes | x | no-console | 禁止使用console
yes | x | no-constant-condition | 禁止条件下的常量表达式
yes | x | no-control-regex | 禁止正则表达式中的控制字符 ：new RegExp("\x1f")
yes | x | no-debugger | 禁止使用debugger
yes | x | no-dupe-args | 禁止函数中定义重复参数
yes | x | no-dupe-keys | 禁止在对象中有重复的属性名
yes | x | no-duplicate-case | 禁止重复的case标签
yes | x | no-empty | 禁止空语句块
yes | x | no-empty-character-class | 禁止在正则表达式中使用空字符集 (/^abc[]/)
yes | x | no-ex-assign | 禁止对 catch 子句的参数重新赋值
yes | fix | no-extra-boolean-cast | 禁止不必要的布尔转换
x | fix | no-extra-parens | 禁止不必要的括号 (a * b) + c
yes | fix | no-extra-semi | 禁止不必要的分号
yes | x | no-func-assign | 禁止对 function 声明重新赋值
yes | x | no-inner-declarations | 禁止在嵌套的块中出现 function 或 var 声明
yes | x | no-invalid-regexp | 禁止 RegExp 构造函数中无效的正则表达式字符串
yes | x | no-irregular-whitespace | 禁止在字符串和注释之外不规则的空白
yes | x | no-obj-calls | 禁止直接使用 Object.prototypes 的内置属性
x | x | no-prototype-builtins | 禁止直接使用 Object.prototypes 的内置属性
yes | fix | no-regex-spaces | 禁止正则表达式字面量中出现多个空格
yes | x | no-sparse-arrays | 禁用稀疏数组
x | x | no-template-curly-in-string | 禁止常规字符串中使用的模板字符串语法
yes | x | no-unexpected-multiline | 禁止出现令人困惑的多行表达式
yes | x | no-unreachable | 禁止在return、throw、continue 和 break语句之后出现不可达代码
yes | x | no-unsafe-finally | 禁止在finally代码块中使用控制流语句
x | fix | no-unsafe-negation | 不允许否定关系运算符左边的操作数
yes | x | use-isnan | 要求使用 isNaN() 检查 NaN
x | x | valid-jsdoc | 强制使用有效的 JSDoc 注释
yes | x | valid-typeof | 强制 typeof 表达式与有效的字符串进行比较

#### 最佳做法
这些规则涉及更好的方法来帮助您避免问题：

eslint:recommended | 可被修复 | 名称 | 描述
---|---
x | x | accessor-pairs | 在对象中强制使用getter和setter
x | x | array-callback-return | 在数组方法的回调中使用返回语句
x | x | block-scoped-var | 强制把变量的使用限制在其定义的作用域范围内
x | x | class-methods-use-this | 强制将在的方法中利用“this”
x | x | complexity | 强制执行一个程序允许的最大循环复杂度
x | fix | curly | 对所有控制语句使用一致的括号风格
x | x | default-case | switch 语句强制 default 分支，也可添加 // no default 注释取消此次警告
x | fix | dot-location | 在'.'之前和之后一致的换行符
x | fix | dot-notation | 强制使用.号取属性
x | fix | eqeqeq | 使用===、!==替代==、!=
x | x | guard-for-in | 要求for-in循环包含一个if语句
x | x | no-alert | 禁止使用alert，confirm和prompt
x | x | no-caller | 不允许使用arguments.caller或arguments.callee
yes | x | no-case-declarations | 在case子句中禁止词法声明
x | x | no-div-regex | 禁止除法操作符显式的出现在正则表达式开始的位置
x | fix | no-else-return | 禁止 if 语句中有 return 之后有 else
x | x | no-empty-function | 禁止出现空函数.如果一个函数包含了一条注释，它将不会被认为有问题
yes | x | no-empty-pattern | 禁止使用空解构模式no-empty-pattern
x | x | no-eq-null | 禁止在没有类型检查操作符的情况下与 null 进行比较
x | x | no-eval | 禁用 eval()
x | x | no-extend-native | 禁止扩展原生类型
x | fix | no-extra-bind | 禁止不必要的 .bind() 调用
x | fix | no-extra-label | 禁用不必要的标签
yes | x | no-fallthrough | 禁止 case 语句落空
x | fix | no-floating-decimal | 禁止数字字面量中使用前导和末尾小数点
yes| x | no-global-assign | 不允许对本地对象或只读全局变量分配
x | fix | no-implicit-coercion | 禁止使用短符号进行类型转换(!!fOO)
x | x | no-implied-eval | 禁止使用类似 eval() 的方法
x | x | no-invalid-this | 禁止 this 关键字出现在类和类对象之外
x | x | no-iterator | 禁用 __iterator__ 属性
x | x | no-labels | 禁用标签语句
x | x | no-lone-blocks | 禁用不必要的嵌套块
x | x | no-loop-func | 禁止在循环中出现 function 声明和表达式
x | x | no-magic-numbers | 禁用魔术数字(3.14什么的用常量代替)
x | fix | no-multi-spaces | 禁止使用多个空格
x | x | no-multi-str | 禁止使用多行字符串，在 JavaScript 中，可以在新行之前使用斜线创建多行字符串
x | x | no-new | 禁止在非赋值或条件语句中使用 new 操作符
x | x | no-new-func | 禁止对 Function 对象使用 new 操作符
x | x | no-new-wrappers | 禁止对 String，Number 和 Boolean 使用 new 操作符
yes | x | no-octal | 禁用八进制字面量
x | x | no-octal-escape | 禁止在字符串中使用八进制转义序列
x | x | no-param-reassign | 不允许对 function 的参数进行重新赋值
x | x | no-proto | 禁用 __proto__ 属性
yes | x | no-redeclare | 禁止使用 var 多次声明同一变量
x | x | no-restricted-properties | 禁止某些对象上的某些属性
x | x | no-return-assign | 禁用指定的通过 require 加载的模块
x | x | no-return-await | 禁止不必要的return await
x | x | no-script-url | 禁止使用 javascript: url
yes | x | no-self-assign | 禁止自我赋值
x | x | no-self-compare | 禁止自身比较
x | x | no-sequences | 禁用逗号操作符
x | x | no-throw-literal | 禁止抛出非异常字面量
x | x | no-unmodified-loop-condition | 禁用一成不变的循环条件
x | x | no-unused-expressions | 禁止出现未使用过的表达式
yes | fix | no-unused-labels | 禁用未使用过的标签
x | x | no-useless-call | 禁止不必要的 .call() 和 .apply()
x | x | no-useless-concat | 禁止不必要的字符串字面量或模板字面量的连接
x | x | no-useless-escape | 禁用不必要的转义字符
x | fix | no-useless-return | 不允许冗余return语句
x | x | no-void | 禁用 void 操作符
x | x | no-warning-comments | 禁止在注释中使用特定的警告术语
x | x | no-with | 禁用 with 语句
x | x | prefer-promise-reject-errors | 要求将Error对象用作“Promise”拒绝原因
x | x | radix | 强制在parseInt()使用基数参数
x | x | require-await | 禁止async函数中没有await表达式
x | x | vars-on-top | 要求所有的 var 声明出现在它们所在的作用域顶部
x | fix | wrap-iife | 要求 IIFE 使用括号括起来
x | fix | yoda | 要求或禁止 “Yoda” 条件

#### 严格模式

eslint:recommended | 可被修复 | 名称 | 描述
---|---
x | fix | strict | 要求或禁止使用严格模式指令

#### 变量声明

eslint:recommended | 可被修复 | 名称 | 描述
---|---
x | x | init-declarations | 要求或禁止 var 声明中的初始化(初值)
x | x | no-catch-shadow | 不允许 catch 子句的参数与外层作用域中的变量同名
yes | x | no-delete-var | 禁止删除变量
x | x | no-restricted-globals | 禁用特定的全局变量
x | x | no-shadow | 禁止 var 声明 与外层作用域的变量同名
x | x | no-label-var | 不允许标签与变量同名
x | x | no-shadow-restricted-names | 禁止覆盖受限制的标识符
yes | x | no-undef | 禁用未声明的变量，除非它们在 /\*global*/ 注释中被提到
x | fix | no-undef-init | 禁止将变量初始化为 undefined
x | x | no-undefined | 禁止将 undefined 作为标识符
yes | x | no-unused-vars | 禁止出现未使用过的变量
x | x | no-use-before-define | 不允许在变量定义之前使用它们


#### Node.js and CommonJS

名称 | 描述
---|---
callback-return | 回调后需要返回的语句
global-require | 要求 require() 出现在顶层模块作用域中
handle-callback-err | 要求回调函数中有容错处理
no-mixed-requires | 禁止混合常规 var 声明和 require 调用
no-new-require | 禁止调用 require 时使用 new 操作符
no-path-concat | 禁止对 \__dirname 和 \__filename进行字符串连接
no-process-env | 禁用 process.env
no-process-exit | 禁用 process.exit()
no-sync | 禁用同步方法

#### 风格问题

eslint:recommended | 可被修复 | 名称 | 描述
---|---
x | fix | array-bracket-spacing | 指定数组的元素之间要以空格隔开(, 后面)， never参数：[ 之前和 ] 之后不能带空格，always参数：[ 之前和 ] 之后必须带空格
x | fix | block-spacing | 禁止或强制在单行代码块中使用空格(禁用)
x | fix | brace-style | 强制使用一致的缩进 第二个参数为 tab 时，会使用tab，
x | x | camelcase | 双峰驼命名格式
x | fix | capitalized-comments | 执行或不允许评论的第一个字母大写
x | fix | comma-spacing | 控制逗号前后的空格
x | fix | comma-dangle | 要求不允许逗号
x | fix | comma-style | 控制逗号在行尾出现还是在行首出现 (默认行尾)
x | fix | computed-property-spacing | 以方括号取对象属性时，[ 后面和 ] 前面是否需要空格, 可选参数 never, always
x | x | consistent-this | 用于指统一在回调函数中指向this的变量名，箭头函数中的this已经可以指向外层调用者，应该没卵用了
x | x | func-names | 强制使用命名的 function 表达式
x | fix | eol-last | 文件末尾强制换行
x | fix | indent | 执行一致的缩进
x | x | key-spacing | 强制在对象字面量的属性中键和值之间使用一致的间距
x | fix | linebreak-style | 强制使用一致的换行风格
x | fix | lines-around-comment | 要求在注释周围有空行      ( 要求在块级注释之前有一空行)
x | x | func-style |  强制一致地使用函数声明或函数表达式，方法定义风格，参数：
x | x | max-nested-callbacks | 强制回调函数最大嵌套深度 5层
x | x | id-blacklist | 禁止使用指定的标识符
x | x | id-length | 强制标识符的最新和最大长度
x | x | id-match | 要求标识符匹配一个指定的正则表达式
x | fix | jsx-quotes | 强制在 JSX 属性中一致地使用双引号或单引号
x | fix | keyword-spacing | 强制在关键字前后使用一致的空格 (前后腰需要)
x | x | max-len | 强制一行的最大长度
x | x | max-lines | 强制最大行数
x | x | max-params | 强制 function 定义中最多允许的参数数量
x | x | max-statements | 强制 function 块最多允许的的语句数量
x | x | max-statements-per-line | 强制每一行中所允许的最大语句数量
x | x | new-cap | 要求构造函数首字母大写  （要求调用 new 操作符时有首字母大小的函数，允许调用首字母大写的函数时没有 new 操作符。）
x | fix | new-parens | 要求调用无参构造函数时有圆括号
x | fix | newline-after-var | 要求或禁止 var 声明语句后有一行空行
x | x | no-array-constructor | 禁止使用 Array 构造函数
x | x | no-bitwise | 禁用按位运算符
x | fix | newline-before-return | 要求 return 语句之前有一空行
x | x | newline-per-chained-call | 要求方法链中每个调用都有一个换行符
x | x | no-continue | 禁用 continue 语句
x | x | no-inline-comments | 禁止在代码行后使用内联注释
x | fix | no-lonely-if | 禁止 if 作为唯一的语句出现在 else 语句中
x | x | no-mixed-operators | 禁止混合使用不同的操作符
yes | x | no-mixed-spaces-and-tabs | 不允许空格和 tab 混合缩进
x | fix | no-multiple-empty-lines | 不允许多个空行
x | x | no-negated-condition | 不允许否定的表达式
x | x | no-nested-ternary | 不允许使用嵌套的三元表达式
x | x | no-new-object | 禁止使用 Object 的构造函数
x | x | no-plusplus | 禁止使用一元操作符 ++ 和 --
x | x | no-restricted-syntax | 禁止使用特定的语法
x | x | no-spaced-func | 禁止 function 标识符和括号之间出现空格
x | x | no-ternary | 不允许使用三元操作符
x | fix | no-trailing-spaces |  禁用行尾空格
x | x | no-underscore-dangle | 禁止标识符中有悬空下划线_bar
x | fix | no-unneeded-ternary | 禁止可以在有更简单的可替代的表达式时使用三元操作符
x | fix | no-whitespace-before-property | 禁止属性前有空白
x | fix | object-curly-newline | 强制花括号内换行符的一致性
x | fix | object-curly-spacing | 强制在花括号中使用一致的空格
x | fix | object-property-newline | 强制将对象的属性放在不同的行上
x | x | one-var | 强制函数中的变量要么一起声明要么分开声明
x | x | one-var-declaration-per-line | 要求或禁止在 var 声明周围换行
x | x | operator-assignment | 要求或禁止在可能的情况下要求使用简化的赋值操作符
x | x | operator-linebreak | 强制操作符使用一致的换行符
x | fix | padded-blocks | 要求或禁止块内填充
x | fix | quote-props | 要求对象字面量属性名称用引号括起来
x | fix | quotes | 强制使用一致的反勾号、双引号或单引号
x | x | require-jsdoc | 要求使用 JSDoc 注释
x | fix | semi | 要求或禁止使用分号而不是 ASI（这个才是控制行尾部分号的，）
x | fix | semi-spacing | 强制分号之前和之后使用一致的空格
x | x | sort-vars | 要求同一个声明块中的变量按顺序排列
x | fix | space-before-blocks | 强制在块之前使用一致的空格
x | fix | space-before-function-paren | 强制在 function的左括号之前使用一致的空格
x | fix | space-in-parens | 强制在圆括号内使用一致的空格
x | fix | space-infix-ops | 要求操作符周围有空格
x | fix | space-unary-ops | 强制在一元操作符前后使用一致的空格
x | fix | spaced-comment | 强制在注释中 // 或 /* 使用一致的空格
x | fix | unicode-bom | 要求或禁止 Unicode BOM
x | fix | wrap-regex |  要求正则表达式被括号括起来

#### ECMAScript 6

eslint:recommended | 可被修复 | 名称 | 描述
---|---
x | fix | arrow-body-style | 要求箭头函数体使用大括号
x | fix | arrow-parens | 要求箭头函数的参数使用圆括号
yes | x | constructor-super | 强制在子类构造函数中用super()调用父类构造函数，TypeScrip的编译器也会提示
x | fix | generator-star-spacing | 强制 generator 函数中 * 号周围使用一致的空格
yes | x | no-class-assign | 禁止修改类声明的变量
x | x | no-confusing-arrow | 不允许箭头功能，在那里他们可以混淆的比较
yes | x | no-const-assign | 禁止修改 const 声明的变量
yes | x | no-dupe-class-members | 禁止类成员中出现重复的名称
x | x | no-duplicate-imports | 不允许复制模块的进口
yes | x | no-new-symbol | 禁止 Symbol  的构造函数
x | x | no-restricted-imports | 允许指定模块加载时的进口
yes | x | no-this-before-super | 禁止在构造函数中，在调用 super() 之前使用 this 或 super
x | fix | no-useless-computed-key | 禁止不必要的计算性能键对象的文字
x | fix | no-var | 要求使用 let 或 const 而不是 var
x | fix | object-shorthand | 要求或禁止对象字面量中方法和属性使用简写语法
x | fix | prefer-arrow-callback | 要求使用箭头函数作为回调
x | fix | prefer-const | 要求使用 const 声明那些声明后不再被修改的变量
x | x | prefer-reflect | 要求在合适的地方使用 Reflect 方法
x | fix | prefer-spread | 要求使用扩展运算符而非 .apply()
x | fix | prefer-template | 要求使用模板字面量而非字符串连接
x | x | prefer-rest-params | 对于arguments使用...rest
yes | x | require-yield | 要求generator 函数内有 yield
x | fix | rest-spread-spacing | "rest"和扩展运算符及其表达式之间的间距
x | fix | sort-imports | 强制模块内的 import 排序
x | fix | template-curly-spacing | 要求或禁止模板字符串中的嵌入表达式周围空格的使用
x | fix | yield-star-spacing | 强制在 yield* 表达式中 * 周围使用空格
