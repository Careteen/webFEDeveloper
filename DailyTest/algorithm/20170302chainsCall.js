<% if( type === 'exports-scene-messages-template'){ %>
    <table class="messages-table">
        <thead>
            <tr>
                <th style="width:18px"></th>
                <th style="width:160px">时间</th>
                <th>Url</th>
                <th style="width:180px">操作</th>
                <th style="width:180px">摘要</th>
                <th style="width:150px">订单号</th>
                <th style="width:50px">详情</th>
            </tr>
        </thead>
        <tbody class="messages-tbody">
            <% var colorsMap = colorsMap; %>
            <% list.forEach(function (item, index) { %>
                <tr class="tr-main js-main" data-index="<%= index %>" style="<%= colorsMap[item._orderId] ? ('color:' + colorsMap[item._orderId])  : '' %>" >
                    <!-- <td class="js-toggle-msg js-message-item"><i class="js-icon glyphicon glyphicon-plus"></i></td> -->
                    <td>
                        <i class="icon-arrow-open js-message-item" data-index="<%= index %>"></i>
                    </td>
                    <td><%= item.logTime.split('+')[0] %></td>
                    <td><%= item.uri %></td>
                    <td><%== translateManOp( item._key) %></td>
                    <td style="word-break: break-all;">
                        <% if(item.errno == '0'){ %>
                            正常：<%= item.errmsg || '-' %>
                        <% } else { %>
                            <%= item.errno ? ('errno:' + item.errno) : ''  %>
                            <%== item.errmsg ? ('<br/>errmsg:' + item.errmsg) : ''  %>
                        <% } %>
                    </td>
                    <td><%= item._orderId %></td>
                    <td><a href="/search/trace?key=<%= item.traceid %>&index=<%= index %>" target="_blank">详情</a></td>
                </tr>
                <tr class="tr-children js-children js-message-detail" data-index="<%= index %>">
                    <td colspan="7">
                        <%== item._infoHtml ? item._infoHtml : '<div class="text-center no-data">暂无详细信息</div>' %>
                    </td>
                </tr>
            <% }); %>
        </tbody>
    </table>
<% } %>

<% if(type==='exports-scene-messages-prePrice-template'){ %>
    <div class="prePrice">
        <ul class="inner-nav-tabs" role="tablist">
            <li class="inner-tab js-inner-tab active" data-target="0"><a href="javascript:void(0)">基础信息</a></li>
            <li class="inner-tab js-inner-tab" data-target="1"><a href="javascript:void(0)">券信息</a></li>
            <li class="inner-tab js-inner-tab" data-target="2"><a href="javascript:void(0)">费用详情</a></li>
            <li class="inner-tab js-inner-tab" data-target="3"><a href="javascript:void(0)">账单信息</a></li>
        </ul>
        <div class="inner-tab-content js-inner-tab-content">
            <div class="inner-tab-pane js-inner-tab-pane active">
                <table class="normal-table">
                    <tbody>
                        <tr>
                            <td>客户端版本号(appversion)</td>
                            <td><%= basicInfo.appversion %></td>
                            <td>imei(imei)</td>
                            <td colspan="3"><%= basicInfo.imei %></td>
                        </tr>
                        <tr>
                            <td>手机型号(model)</td>
                            <td><%= basicInfo.model %></td>
                            <td>网络类型(networkType)</td>
                            <td><%= basicInfo.networkType %></td>
                            <td>手机系统(os)</td>
                            <td><%= basicInfo.os %></td>
                        </tr>
                        <tr>
                            <td>出发地地址(fromAddress)</td>
                            <td><%= basicInfo.fromAddress %></td>
                            <td>出发地名字(fromName)</td>
                            <td><%= basicInfo.fromName %></td>
                            <td>渠道(channel)</td>
                            <td><%= basicInfo.channel %></td>
                        </tr>
                        <tr>
                            <td>目的地地址(toAddress)</td>
                            <td><%= basicInfo.toAddress %></td>
                            <td>目的地名字(toName)</td>
                            <td><%= basicInfo.toName %></td>
                            <td>城市(area)</td>
                            <td><%= basicInfo.area %></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="inner-tab-pane js-inner-tab-pane">
                <table class="normal-table">
                    <thead>
                        <th>券ID</th>
                        <th>券金额</th>
                        <th>券生命开始</th>
                        <th>券生命终止</th>
                        <th>活动ID</th>
                        <th>批次ID</th>
                        <th>券最大金额</th>
                        <th>呼叫券返回</th>
                        <th>备注</th>
                    </thead>
                    <tbody>
                        <% var hasCoupon = false; %>
                        <% if(coupon.result_carPool && coupon.result_carPool.length){ hasCoupon = true; %>
                            <tr><td colspan="9" class="sub-header">拼车券</td></tr>
                            <% coupon.result_carPool.forEach(function (item) { %>
                                <tr>
                                    <td><%= item.couponid %></td>
                                    <td><%= item.coupon_amount %></td>
                                    <td><%= item.enable_time %></td>
                                    <td><%= item.expire_time %></td>
                                    <td><%= item.budgetid %></td>
                                    <td><%= item.batchid %></td>
                                    <td><%= item.max_amount %></td>
                                    <td><%= item.backtrace %></td>
                                    <td><%= item.remark %></td>
                                </tr>
                            <% }); %>
                        <% } %>
                        <% if(coupon.result_not_carPool && coupon.result_not_carPool.length){ hasCoupon = true; %>
                            <tr><td colspan="9" class="sub-header">非拼车券</td></tr>
                            <% coupon.result_not_carPool.forEach(function (item) { %>
                                <tr>
                                    <td><%= item.couponid %></td>
                                    <td><%= item.coupon_amount %></td>
                                    <td><%= item.enable_time %></td>
                                    <td><%= item.expire_time %></td>
                                    <td><%= item.budgetid %></td>
                                    <td><%= item.batchid %></td>
                                    <td><%= item.max_amount %></td>
                                    <td><%= item.backtrace %></td>
                                    <td><%= item.remark %></td>
                                </tr>
                            <% }); %>
                        <% } %>
                        <% if(coupon.mis_carPool && coupon.mis_carPool.length){ hasCoupon = true; %>
                            <tr><td colspan="9" class="sub-header">呼叫返券拼车券</td></tr>
                            <% coupon.mis_carPool.forEach(function (item) { %>
                                <tr>
                                    <td><%= item.couponid %></td>
                                    <td><%= item.coupon_amount %></td>
                                    <td><%= item.enable_time %></td>
                                    <td><%= item.expire_time %></td>
                                    <td><%= item.budgetid %></td>
                                    <td><%= item.batchid %></td>
                                    <td><%= item.max_amount %></td>
                                    <td><%= item.backtrace %></td>
                                    <td><%= item.remark %></td>
                                </tr>
                            <% }); %>
                        <% } %>                
                        <% if(coupon.mis_not_carPool && coupon.mis_not_carPool.length){ hasCoupon = true; %>
                            <tr><td colspan="9" class="sub-header">呼叫返券非拼车券</td></tr>
                            <% coupon.mis_not_carPool.forEach(function (item) { %>
                                <tr>
                                    <td><%= item.couponid %></td>
                                    <td><%= item.coupon_amount %></td>
                                    <td><%= item.enable_time %></td>
                                    <td><%= item.expire_time %></td>
                                    <td><%= item.budgetid %></td>
                                    <td><%= item.batchid %></td>
                                    <td><%= item.max_amount %></td>
                                    <td><%= item.backtrace %></td>
                                    <td><%= item.remark %></td>
                                </tr>
                            <% }); %>
                        <% } %>
                        <% if(!hasCoupon){ %>
                            <tr><td colspan="9" class="text-center">没有券的信息</td></tr>
                        <% } %>
                    </tbody>
                </table>
            </div>
            <div class="inner-tab-pane js-inner-tab-pane">
                <table class="normal-table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>预估金额(优惠后)</th>
                            <th>券优惠文案</th>
                            <th>是否拼车</th>
                            <th>订单级别</th>
                        </tr>
                    </thead>
                    <tbody>
                        <% if(fee && fee.length){ %>
                            <% fee.forEach(function (item) { %>
                            <tr>
                                <td><%= item.is_carpool == 1 ? '乘客端拼车预估展示' : '乘客端非拼车预估展示' %></td>
                                <td><%= item.estimateFee %></td>
                                <td><%= item.coupon_msg %></td>
                                <td><%= item.intro_msg %></td>
                                <td><%= item.require_level %></td>
                            </tr>
                            <% }); %>
                        <% } %>
                    </tbody>
                </table>
            </div>
            <div class="inner-tab-pane js-inner-tab-pane">
                <table class="normal-table">
                    <thead>
                        <tr>
                            <th style="width:80px">车型</th>
                            <th>是否拼车</th>
                            <th>起步价</th>
                            <th>里程费</th>
                            <th>时间费</th>
                            <th>夜间费</th>
                            <th>空驶费</th>
                            <th>低速费</th>
                            <th>sub_total</th>
                            <th>基础车费</th>
                            <th>需支付金额</th>
                            <th>折扣</th>
                            <th>等候折扣</th>
                            <th>动调倍数</th>
                            <th>动调后金额</th>
                            <th>一口价</th>
                            <th>最低消费</th> 
                        </tr>
                    </thead>
                    <tbody>
                        <% for(var key in billInfo.bills){ %>
                            <% var tmp = billInfo.bills[key]; %>
                            <% tmp.carpool = tmp.carpool || {}; %>
                            <% tmp.noncarpool = tmp.noncarpool || {}; %>
                            <tr>
                                <td rowspan="2">
                                <%= key %><br/>
                                    里程:<%= billInfo.driver_metre %><br/>
                                    时间:<%= billInfo.driver_minute %>
                                </td>
                                <td>
                                    拼车
                                </td>
                                <td><%= tmp.carpool.start_price %></td>
                                <td><%= tmp.carpool.normal_price %></td>
                                <td><%= tmp.carpool.time_price %></td>
                                <td><%= tmp.carpool.night_price %></td>
                                <td><%= tmp.carpool.empty_price %></td>

                                <td><%= tmp.carpool.low_speed_price %></td>
                                <td><%= tmp.carpool.sub_total %></td>
                                <td><%= tmp.carpool.total_fee %></td>
                                <td><%= tmp.carpool.pre_total_fee %></td>
                                <td><%= tmp.carpool.discount %></td>

                                <td><%= tmp.carpool.wait_discount %></td>
                                <td><%= tmp.carpool.dynamic_times %></td>
                                <td><%= tmp.carpool.dynamic_total_fee %></td>
                                <td><%= tmp.carpool.cap_price %></td>
                                <td><%= tmp.carpool.limit_fee %></td>
                            </tr>
                            <tr>
                                <td>
                                    不拼车
                                </td>
                                <td><%= tmp.noncarpool.start_price %></td>
                                <td><%= tmp.noncarpool.normal_price %></td>
                                <td><%= tmp.noncarpool.time_price %></td>
                                <td><%= tmp.noncarpool.night_price %></td>
                                <td><%= tmp.noncarpool.empty_price %></td>

                                <td><%= tmp.noncarpool.low_speed_price %></td>
                                <td><%= tmp.noncarpool.sub_total %></td>
                                <td><%= tmp.noncarpool.total_fee %></td>
                                <td><%= tmp.noncarpool.pre_total_fee %></td>
                                <td><%= tmp.noncarpool.discount %></td>

                                <td><%= tmp.noncarpool.wait_discount %></td>
                                <td><%= tmp.noncarpool.dynamic_times %></td>
                                <td><%= tmp.noncarpool.dynamic_total_fee %></td>
                                <td><%= tmp.noncarpool.cap_price %></td>
                                <td><%= tmp.noncarpool.limit_fee %></td>
                            </tr>
                        <% } %>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
<% } %>

<% if(type==='exports-scene-messages-pNewOrder-template'){ %>
    <div class="pNewOrder">
        <ul class="inner-nav-tabs" role="tablist">
            <li class="inner-tab js-inner-tab active" data-target="0"><a href="javascript:void(0)">操作状态</a></li>
        </ul>
        <div class="inner-tab-content js-inner-tab-content">
            <div class="inner-tab-pane js-inner-tab-pane active">
                <table class="normal-table">
                    <tbody>
                        <tr>
                            <td>验证支付能力返回码</td>
                            <td><%= newStatus.errno == '0' ? '正常': newStatus.errno %></td>
                            <td>坐标返回码</td>
                            <td><%= locsvr_result.errno == '0' ? '正常': locsvr_result.errno %></td>
                            <td>风控返回</td>
                            <td>返回码：<%= newOrder.is_spam == '-1' ? '正常': '被拦截' %>，返回信息：<%= newOrder.antispam_msg || '-' %></td>
                        </tr>
                        <tr>
                            <% newStatus = newStatus || { } %>
                            <% newStatus.result = newStatus.result || { } %>
                            <td>QQ钱包</td>
                            <td><%= ['未验证', '验证通过'][newStatus.result.qq] %></td>
                            <td>连连支付</td>
                            <td><%= ['未验证', '验证通过'][newStatus.result.lianlian] %></td>
                            <td>支付宝</td>
                            <td><%= ['未验证', '验证通过'][newStatus.result.ali] %></td>
                        </tr>
                        <tr>
                            <td>百度钱包</td>
                            <td><%= ['未验证', '验证通过'][newStatus.result.baidu] %></td>
                            <td>招商一网通</td>
                            <td><%= ['未验证', '验证通过'][newStatus.result.zmxy] %></td>
                            <td>微信支付</td>
                            <td><%= ['未验证', '验证通过'][newStatus.result.wx] %></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
<% } %>

<% if(type==='exports-scene-messages-dArrived-template'){ %>
    <div class="dArrived">
        到达返回码(errno)：<%= status.errno || '-' %><br/>
        到达返回信息(errmsg)：<%= status.errmsg || '-' %>
    </div>
<% } %>

<% if(type==='exports-scene-messages-dBeginCharge-template'){ %>
    <div class="dBeginCharge">
        开始计费返回码(errno)：<%= status.errno || '-' %><br/>
        开始计费返回信息(errmsg)：<%= status.errmsg || '-' %><br/>
        账单开始计费返回码(errno): <%= beginBill.errno || '-' %><br/>
        账单开始计费返回信息(errmsg): <%= beginBill.errmsg || '-' %>
    </div>
<% } %>

<% if(type==='exports-scene-messages-dEndCharge-template'){ %>
    <div class="dEndCharge">
        确认账单返回码(errno)：<%= status.errno || '-' %><br/>
        确认账单返回信息(errmsg)：<%= status.errmsg || '-' %><br/>
        账单费用返回码(errno)：<%= endBill.errno || '-' %><br/>
        账单费用返回信息(errmsg)：<%= endBill.errmsg || '-' %>
    </div>
<% } %>

<% if(type==='exports-scene-messages-dFinishOrder-template'){ %>
    <div class="dFinishOrder">
        <ul class="inner-nav-tabs" role="tablist">
            <li class="inner-tab js-inner-tab active" data-target="0"><a href="javascript:void(0)">操作状态</a></li>
            <li class="inner-tab js-inner-tab" data-target="1"><a href="javascript:void(0)">账单信息</a></li>
            <li class="inner-tab js-inner-tab" data-target="2"><a href="javascript:void(0)">乘客费用信息</a></li>
            <li class="inner-tab js-inner-tab" data-target="3"><a href="javascript:void(0)">免密支付</a></li>
            <li class="inner-tab js-inner-tab" data-target="4"><a href="javascript:void(0)">司机分账信息</a></li>
        </ul>
        <div class="inner-tab-content js-inner-tab-content">
            <div class="inner-tab-pane js-inner-tab-pane active">
                <table class="normal-table">
                    <tbody>
                       <tr>
                            <td rowspan="2">结束计费</td>
                            <td>返回码</td>
                            <td><%= status.errno == null ? '-' : status.errno %></td>
                            <td rowspan="2">结束账单</td>
                            <td>返回码</td>
                            <td><%= finishBill.errno == null ? '-' : finishBill.errno %></td>
                       </tr>
                       <tr>
                            <td>返回信息</td>
                            <td><%= status.errmsg == null ? '-' : status.errmsg %></td>
                            <td>返回信息</td>
                            <td><%= finishBill.errmsg == null ? '-' : finishBill.errmsg %></td>
                       </tr>
                       <tr>
                            <td rowspan="2">费用结算</td>
                            <td>返回码</td>
                            <td><%= finishOrder.errno == null ? '-' : finishOrder.errno %></td>
                            <td rowspan="2">下发乘客账单</td>
                            <td>返回码</td>
                            <td><%= payBill.errno == null ? '-' : payBill.errno %></td>
                       </tr>
                       <tr>
                            <td>返回信息</td>
                            <td><%= finishOrder.errmsg == null ? '-' : finishOrder.errmsg %></td>
                            <td>返回信息</td>
                            <td><%= payBill.errmsg == null ? '-' : payBill.errmsg %></td>
                       </tr>
                        <tr>
                            <td rowspan="2">创建支付订单</td>
                            <td>返回码</td>
                            <td><%= payOrder.errno == null ? '-' : payOrder.errno %></td>
                            <td rowspan="2">司机分账</td>
                            <td>返回码</td>
                            <td><%= prePareSeparateStatus.errno == null ? '-' : prePareSeparateStatus.errno %></td>
                       </tr>
                       <tr>
                            <td>返回信息</td>
                            <td><%= payOrder.errmsg == null ? '-' : payOrder.errmsg %></td>
                            <td>返回信息</td>
                            <td><%= prePareSeparateStatus.errmsg == null ? '-' : prePareSeparateStatus.errmsg %></td>
                       </tr> 
                    </tbody>
                </table>
            </div>
            <div class="inner-tab-pane js-inner-tab-pane">
                <table class="normal-table">
                    <tbody>
                        <tr>
                            <td></td>
                            <td>乘客账单</td>
                            <td>司机账单</td>
                        </tr>   
                        <% [
                            { key: 'total_fee', text: '总车费' },
                            { key: 'cap_price', text: '一口价' },
                            { key: 'start_price', text: '起步价' },
                            { key: 'normal_distance', text: '里程' }, 
                            { key: 'normal_fee', text: '里程费' },
                            { key: 'normal_time', text: '时间' },
                            { key: 'normal_time_fee', text: '时间费' },
                            { key: 'low_speed_time', text: '低俗时间' },
                            { key: 'low_speed_fee', text: '低俗费' },
                            { key: 'empty_distance', text: '空驶里程' },
                            { key: 'empty_fee', text: '空驶费' },
                            { key: 'night_distance', text: '夜间里程' },
                            { key: 'night_fee', text: '夜间费' },
                            { key: 'bonus', text: '平台加价' },
                            { key: 'highway_fee', text: '高速费' },
                            { key: 'bridge_fee', text: '过桥费' },
                            { key: 'park_fee', text: '停车费' },
                            { key: 'wait_fee', text: '等候费' },
                            { key: 'other_fee', text: '其他费' },
                            { key: 'limit_fee', text: '最低消费' },
                            { key: 'limit_pay', text: '需补足金额' },
                            { key: 'tip_fee', text: '小费' },
                            { key: 'dynamic_price', text: '动调金额' },
                            { key: 'combo_fee', text: '连击费' }].forEach(function (item) { %>
                            <tr>
                            <td><%= item.text %>(<%= item.key %>)</td><td><%= (billInfo.passenger || {})[item.key] %></td><td><%= (billInfo.driver || {})[item.key] %></td>
                            </tr>
                        <% }); %>
                    </tbody>
                </table>
            </div>
            <div class="inner-tab-pane js-inner-tab-pane">
                <table class="normal-table">
                    <tbody>
                        <tr>
                            <td colspan="2">基本信息</td>
                            <td>优惠券信息</td>
                            <td>费用信息</td>
                            <td>支付款渠道</td>
                        </tr>
                        <% [{ key: 'total_fee', text: '总车费' },
                            { key: 'pay_button_title_label', text: '端支付按钮' },
                            { key: 'cap_price', text: '一口价' },
                            { key: 'dynamic_fee', text: '动调费' },    
                            { key: 'cancle_reparation_fee', text: '取消费' },  
                            { key: 'normal_time_fee', text: '时间费' },    
                            { key: 'favour_total', text: '优惠总计' },  
                            { key: 'sp_msg', text: '补足最低消费' },  
                            { key: 'limit_fee', text: '最低消费' }, 
                            { key: 'batchid', text: '券批次ID' },  
                            { key: 'coupon_id', text: '券ID' }].forEach(function (item, index){ %>
                            <tr>
                                <td><%= item.text %>(<%= item.key %>)</td>
                                <td><%= passengerBillPay[item.key] %></td>
                                <% if(!index){ %>
                                    <td rowspan="11">
                                        <% if(passengerBillPay.favour_fee_info_list && passengerBillPay.favour_fee_info_list.length){ %>
                                        <table class="normal-table">
                                            <tbody>
                                                <%  passengerBillPay.favour_fee_info_list.forEach(function (item, index){ %>
                                                    <tr>
                                                        <td rowspan="2"><%= index + 1 %></td>
                                                        <td>优惠费用名称(fee_label)</td>
                                                        <td><%= item.fee_label %></td>
                                                    </tr>
                                                    <tr>
                                                        <td>优惠费用值(fee_value)</td>
                                                        <td><%= item.fee_value %></td>
                                                    </tr>
                                                <% }); %>                
                                            </tbody>
                                        </table>
                                        <% } %>
                                    </td>
                                    <td rowspan="11">
                                        <% if(passengerBillPay.basic_fee_info_list && passengerBillPay.basic_fee_info_list.length){ %>
                                        <table class="normal-table">
                                            <tbody>
                                                <%  passengerBillPay.basic_fee_info_list.forEach(function (item, index){ %>
                                                    <tr>  
                                                        <td rowspan="2"><%= index + 1 %></td>
                                                        <td>基础车费名称(fee_label)</td>
                                                        <td><%= item.fee_label %></td>
                                                    </tr>
                                                    <tr>
                                                        <td>基础车费值(fee_value)</td>
                                                        <td><%= item.fee_value %></td>
                                                    </tr>
                                                <% }); %>                
                                            </tbody>
                                        </table>
                                        <% } %>
                                    </td>
                                    <td rowspan="11">
                                        <% if(passengerBillPay.payments && passengerBillPay.payments.length){ %>
                                        <table class="normal-table">
                                            <tbody>
                                                <%  passengerBillPay.payments.forEach(function (item, index){ %>
                                                    <tr>
                                                        <td>渠道(channelID)</td>
                                                        <td><%= item.channelID || item.payment_name %></td>
                                                    </tr>
                                                <% }); %>                
                                            </tbody>
                                        </table>
                                        <% } %>
                                    </td>
                                <% } %>
                            </tr>
                        <% }); %>
                    </tbody>
                </table>
            </div>
            <div class="inner-tab-pane js-inner-tab-pane">
                <table class="normal-table">
                    <tbody>
                        <tr>
                            <td colspan="2">基本信息</td>
                            <td>支付信息</td>
                        </tr>
                        <% createPayOrder = createPayOrder || {} %>
                        <% if(createPayOrder.userID){ %>
                            <% [{ key: 'userID', text: '用户ID' },
                                { key: 'phone', text: '用户手机号' },
                                { key: 'totalAmount', text: '支付总金额' },  
                                { key: 'device_no', text: '设备号' }].forEach(function (item, index){ %>
                                    <tr>
                                        <td><%= item.text %>(<%= item.key %>)</td><td><%= item.key === 'totalAmount' ? (createPayOrder[item.key]/100).toFixed(2) : createPayOrder[item.key] %></td>
                                        <% if(!index){ %>
                                            <td rowspan="4">
                                                <% if (createPayOrder.list && createPayOrder.list.length){ %>
                                                <table class="normal-table">
                                                    <tbody>
                                                        <% createPayOrder.list.forEach(function (item, index) { %>
                                                            <tr><td rowspan="4"><%= index + 1 %></td><td>券ID或商户交易号(detailParterID)</td><td><%= item.detailParterID || '-' %></td></tr>
                                                            <tr><td>支付渠道(channelID)</td><td><%= item.channelID || '-' %></td></tr>
                                                            <tr><td>支付金额(detailAmount)</td><td><%= (item.detailAmount/100).toFixed(2) || '-' %></td></tr>
                                                            <tr><td>备注(remark)</td><td><%= item.remark || '-' %></td></tr>
                                                        <% }); %>
                                                    </tbody>
                                                </table>
                                                <% } %>
                                            </td>
                                        <% } %>
                                    </tr>
                                <% }); %>
                        <% } else { %>
                            <tr><td colspan="3" class="text-center">非免密支付</td></tr>
                        <% } %>
                    </tbody>
                </table>
            </div>
            <div class="inner-tab-pane js-inner-tab-pane">
                <table class="normal-table">
                    <tbody>
                        <% prePareSeparate = prePareSeparate || {} %>
                        <% [{ key: 'total_fee', text: '司机总车费' },
                            { key: 'basic_fee', text: '基础车费' },
                            { key: 'driver_broker', text: '司机获得费用-扣保险后' },
                            { key: 'didi_broker', text: '滴滴获得费用' }, 
                            { key: 'company_id', text: '绑定公司ID' }].forEach(function (item, index){ %>
                                <tr>
                                    <td><%= item.text %>(<%= item.key %>)</td><td><%= prePareSeparate[item.key] || '-' %></td>
                                </tr>
                            <% }); %>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
<% } %>

<% if(type==='exports-scene-messages-pPrePay-template'){ %>
    <div class="pPrePay">
        <ul class="inner-nav-tabs" role="tablist">
            <li class="inner-tab js-inner-tab active" data-target="0"><a href="javascript:void(0)">操作状态</a></li>
            <li class="inner-tab js-inner-tab" data-target="1"><a href="javascript:void(0)">发起支付信息</a></li>
        </ul>
        <div class="inner-tab-content js-inner-tab-content">
            <div class="inner-tab-pane js-inner-tab-pane active">
                <table class="normal-table">
                     <tr>
                            <td rowspan="2">乘客发起支付</td>
                            <td>返回码</td>
                            <td><%= pPrePayStatus.errno == null ? '-' : pPrePayStatus.errno %></td>
                            <td rowspan="2">收银发起支付</td>
                            <td>返回码</td>
                            <td><%= cashierStatus.errno == null ? '-' : cashierStatus.errno %></td>
                            <td rowspan="2">创建支付订单</td>
                            <td>返回码</td>
                            <td><%= createPayOrderStatus.errno == null ? '-' : createPayOrderStatus.errno %></td>
                    </tr>
                    <tr>
                        <td>返回信息</td>
                        <td><%= pPrePayStatus.errmsg == null ? '-' : pPrePayStatus.errmsg %></td>
                        <td>返回信息</td>
                        <td><%= cashierStatus.errmsg == null ? '-' : cashierStatus.errmsg %></td>
                        <td>返回信息</td>
                        <td><%= createPayOrderStatus.errmsg == null ? '-' : createPayOrderStatus.errmsg %></td>
                    </tr> 
                </table>
            </div>
            <div class="inner-tab-pane js-inner-tab-pane">
                <table class="normal-table">
                    <tbody>
                        <tr>
                            <td colspan="2">基本信息</td>
                            <td>支付信息</td>
                        </tr>
                        <% createPayOrder = createPayOrder || {} %>
                        <% [{ key: 'userID', text: '用户ID' },
                            { key: 'phone', text: '用户手机号' },
                            { key: 'totalAmount', text: '支付总金额' },  
                            { key: 'device_no', text: '设备号' }].forEach(function (item, index){ %>
                                <tr>
                                    <td><%= item.text %>(<%= item.key %>)</td><td><%= item.key === 'totalAmount' ? (createPayOrder[item.key]/100).toFixed(2) : createPayOrder[item.key] %></td>
                                    <% if(!index){ %>
                                        <td rowspan="4">
                                            <% if (createPayOrder.list && createPayOrder.list.length){ %>
                                            <table class="normal-table">
                                                <tbody>
                                                    <% createPayOrder.list.forEach(function (item, index) { %>
                                                        <tr><td rowspan="4"><%= index + 1 %></td><td>券ID或商户交易号(detailParterID)</td><td><%= item.detailParterID %></td></tr>
                                                        <tr><td>支付渠道(channelID)</td><td><%= item.channelID %></td></tr>
                                                        <tr><td>支付金额(detailAmount)</td><td><%= (item.detailAmount/100).toFixed(2) || '-' %></td></tr>
                                                        <tr><td>备注(remark)</td><td><%= item.remark %></td></tr>
                                                    <% }); %>
                                                </tbody>
                                            </table>
                                            <% } %>
                                        </td>
                                    <% } %>
                                </tr>
                            <% }); %>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
<% } %>

<% if(type==='exports-scene-messages-commonNotify-template'){ %>
    <div class="commonNotify">
        返回码(errno)：<%= status.errno == null ? '-' : status.errno %><br/>
        返回信息(errmsg)：<%= status.errmsg || '-' %><br/>
    </div>
<% } %>

<% if(type==='exports-scene-messages-taxipNewOrder-template'){ %>
    <div class="taxipNewOrder">
        <ul class="inner-nav-tabs" role="tablist">
            <li class="inner-tab js-inner-tab active" data-target="0"><a href="javascript:void(0)">基础信息</a></li>
        </ul>
        <div class="inner-tab-content js-inner-tab-content">
            <div class="inner-tab-pane js-inner-tab-pane active">
                <table class="normal-table">
                    <tbody>
                        <tr>
                            <td>订单类型</td>
                            <td><%= ['语音订单', '文本订单'][args.input] || args.input %></td>
                            <td>出发地经纬度</td>
                            <td style="word-break:break-all"><%= args.flng %>,<%= args.flat %></td>
                            <td>目的地金纬度</td>
                            <td style="word-break:break-all"><%= args.tlng %>,<%= args.tlat %></td>
                        </tr>
                        <tr>
                            <td>乘客定位点金纬度</td>
                            <td style="word-break:break-all"><%= args.lng %>,<%= args.lat %></td>
                            <td>出发地</td>
                            <td><%= args.from_address %>,<%= args.from_name %></td>
                            <td>目的地</td>
                            <td><%= args.to_address %>,<%= args.to_name %></td>
                        </tr>
                        <tr>
                            <td>愿等时间(分)</td>
                            <td><%= args.extra_waittime %></td>
                            <td>小费</td>
                            <td><%= args.tip %></td>
                            <td>号码保护乘客端状态</td>
                            <td><%= args.virtual_mobile_status == 1 ? '启用' : args.virtual_mobile_status %></td>
                        </tr>
                        <tr>
                            <td>附加消息</td>
                            <td><%= args.extra_info %></td>
                            <td>是否新的扩展信息</td>
                            <td><%= args.isnew_extra == 1 ? '是': args.isnew_extra %></td>
                            <td>渠道号</td>
                            <td><%= args.channel %></td>
                        </tr>
                        <tr>
                            <td>拼车意愿类型</td>
                            <td><%= ['不拼车', '愿拼车', '只拼车'][args.trip_type] || args.trip_type %></td>
                            <td>单类型</td>
                            <td><%= args.is_elder %></td>
                            <td>是否拼车</td>
                            <td><%= ['非拼车', '拼车'][args.iscarpool] || args.iscarpool %></td>
                        </tr>
                        <tr>
                            <td>动调类型</td>
                            <td><%= args.dynamic_type %></td>
                            <td>动调价格</td>
                            <td><%= args.dynamic_price %></td>
                            <td>预估价格的相关信息</td>
                            <td><%= args.ekey %></td>
                        </tr>

                        <tr>
                            <td>一口价信息</td>
                            <td><%= args.one_price %></td>
                            <td>拼车后的价格</td>
                            <td><%= args.carpool_price %></td>
                            <td>地图类型</td>
                            <td><%= args.maptype %></td>
                        </tr>
                        <tr>
                            <td>选择的接单车型</td>
                            <td><%= ['全部(默认)', '便宜车'][args.car_level] || args.car_level %></td>
                            <td>是否选择的只要1公里内司机接单</td>
                            <td colspan="3"><%= ['没选中(默认)', '选中'][args.is_one_kilometer] || args.is_one_kilometer %></td>
                        </tr>
                        <tr>
                            <td>预约时间</td>
                            <td><%= args.time %></td>
                            <td>实际乘车人电话</td>
                            <td><%= args.passenger_phone %></td>
                            <td>拼座的数目</td>
                            <td><%= args.carpool_seatnum %></td>
                        </tr>
                        <tr>
                            <td>拼不成价</td>
                            <td><%= args.carpool_fail_price %></td>
                            <td>拼成上限价格</td>
                            <td><%= args.carpool_max %></td>
                            <td>拼成下限价格</td>
                            <td><%= args.carpool_min %></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
<% } %>

<% if(type==='exports-scene-messages-taxidStrive-template'){ %>
    <div class="taxidStrive">
        <ul class="inner-nav-tabs" role="tablist">
            <li class="inner-tab js-inner-tab active" data-target="0"><a href="javascript:void(0)">基础信息</a></li>
        </ul>
        <div class="inner-tab-content js-inner-tab-content">
            <div class="inner-tab-pane js-inner-tab-pane active">
                司机ID(did): <%= args.did || '-' %><br/>
                订单ID(oid): <%= args.oid || '-' %><br/>
                司机抢单返回码(errno): <%= args.errno  || '-' %><br/>
                司机抢单返回信息(errmsg) : <%= args.errmsg || '-' %><br/>
                抢单结果回调返回码(errno): <%= args.cberrno == null ? '-' : args.cberrno %><br/>
                抢单结果回调返回信息(errmsg) : <%= args.cberrmsg || '-' %><br/>
                抢快车单结果返回码(errno): <%= args.rerrno == null ? '-' : args.rerrno %><br/>
                抢快车单结果返回信息(errmsg) : <%= args.rerrmsg || '-' %>
            </div>
        </div>
    </div>
<% } %>

<% if(type==='exports-scene-messages-taxipGetPayInfo-template'){ %>
    <div class="taxipGetPayInfo">
        <ul class="inner-nav-tabs" role="tablist">
            <li class="inner-tab js-inner-tab active" data-target="0"><a href="javascript:void(0)">基础信息</a></li>
        </ul>
        <div class="inner-tab-content js-inner-tab-content">
            <div class="inner-tab-pane js-inner-tab-pane active">
               <table class="normal-table">
                    <tbody>
                        <tr>
                            <% var dcqInfo = args.dcq_info || {} %>
                            <td>乘客ID(pid)</td>
                            <td><%= args.pid %></td>
                            <td>券ID(dcq_id)</td>
                            <td><%= dcqInfo.dcq_id %></td>
                            <td>券金额(dcq_amount)</td>
                            <td><%= dcqInfo.dcq_amount %></td>
                            <td>券文案(dcq_text)</td>
                            <td><%= dcqInfo.dcq_text %></td>
                        </tr>
                        <tr>
                            <td>余额(balance)</td>
                            <td><%= args.balance %></td>
                            <td>车费金额(cost)</td>
                            <td><%= args.cost ? (args.cost / 100).toFixed(2) : '-' %></td>
                            <td>要支付的金额-企业(enterprise_fee)</td>
                            <td><%= args.enterprise_fee %></td>
                            <td>实际支付金额(true_pay)</td>
                            <td><%= args.true_pay ? (args.true_pay / 100).toFixed(2) : '-' %></td>
                        </tr>
                        <tr>
                            <td>返回码(errno)</td>
                            <td><%= args.errno %></td>
                            <td>返回信息(errmsg)</td>
                            <td><%= args.errmsg %></td>
                            <td colspan="4"></td>
                        </tr>
                    </tbody>
               </table>
            </div>
        </div>
    </div>
<% } %>

<% if(type==='exports-scene-messages-taxipGenPayParams-template'){ %>
    <div class="taxipGenPayParams">
        <ul class="inner-nav-tabs" role="tablist">
            <li class="inner-tab js-inner-tab active" data-target="0"><a href="javascript:void(0)">基础信息</a></li>
        </ul>
        <div class="inner-tab-content js-inner-tab-content">
            <div class="inner-tab-pane js-inner-tab-pane active">
               <table class="normal-table">
                    <tbody>
                        <tr>
                            <td>乘客手机号(phone)</td>
                            <td><%= args.phone %></td>
                            <td>乘客手机系统(os)</td>
                            <td><%= args.os %></td>
                            <td>手机型号(model)</td>
                            <td><%= args.model %></td>
                        </tr>
                        <tr>
                            <td>支付金额(cost)</td>
                            <td><%= args.cost ? (args.cost / 100).toFixed(2) : '-' %></td>
                            <td>渠道ID(channel)</td>
                            <td><%= args.channel %></td>
                            <td>支付渠道(channel_id)</td>
                            <td><%= args.channel_id %></td>
                        </tr>
                        <tr>
                            <td>券ID(dcq_id)</td>
                            <td><%= args.dcq_id %></td>
                            <td>要支付的金额-企业(is_install_alipay)</td>
                            <td><%== ['未安装', '', '安装'][args.is_install_alipay] || args.is_install_alipay  %></td>
                            <td colspan="2"></td>
                        </tr>
                        <tr>
                            <td>返回码(errno)</td>
                            <td><%= out.errno %></td>
                            <td>返回信息(errmsg)</td>
                            <td><%= out.errmsg %></td>
                            <td>支付信息(pay_order_title)</td>
                            <td><%= out.pay_order_title %></td>
                        </tr>
                    </tbody>
               </table>
            </div>
        </div>
    </div>
<% } %>

<% if(type==='exports-scene-messages-taxidLetPay-template'){ %>
    <div class="taxidLetPay">
        <ul class="inner-nav-tabs" role="tablist">
            <li class="inner-tab js-inner-tab active" data-target="0"><a href="javascript:void(0)">基础信息</a></li>
        </ul>
        <div class="inner-tab-content js-inner-tab-content">
            <div class="inner-tab-pane js-inner-tab-pane active">
               <table class="normal-table">
                    <tbody>
                        <tr>
                            <td>客户端版本(appversion)</td>
                            <td><%= args.appversion %></td>
                            <td>手机型号(model)</td>
                            <td><%= args.model %></td>
                            <td>imei(imei)</td>
                            <td><%= args.imei %></td>
                            <td class="text-center">费用</td>
                        </tr>
                        <tr>
                            <td>车费(fare)</td>
                            <td><%= args.fare %></td>
                            <td>其他费(other)</td>
                            <td><%= args.other %></td>
                            <td>坐标经纬度(commonlng)</td>
                            <td><%= args.commonlng %>,<%= args.commonlat %></td>
                            <td rowspan="2">
                                <% if (out.item && out.item.length){ %>
                                <table class="normal-table">
                                    <% out.item.forEach(function(item) { %>
                                        <tr><td><%= item.name %></td><td><%= item.value %></td></tr>
                                    <% }); %>
                                </table>
                                <% } %>
                            </td>
                        </tr>
                        <tr>
                            <td>返回码(errno)</td>
                            <td><%= out.errno %></td>
                            <td>返回信息(errmsg)</td>
                            <td><%= out.errmsg %></td>
                            <td>支付信息(total_fee)</td>
                            <td><%= out.total_fee %></td>
                        </tr>
                    </tbody>
               </table>
            </div>
        </div>
    </div>
<% } %>

<% if(type==='exports-scene-messages-taxidTerminateOrder-template'){ %>
    <div class="taxidTerminateOrder">
        <ul class="inner-nav-tabs" role="tablist">
            <li class="inner-tab js-inner-tab active" data-target="0"><a href="javascript:void(0)">基础信息</a></li>
        </ul>
        <div class="inner-tab-content js-inner-tab-content">
            <div class="inner-tab-pane js-inner-tab-pane active">
               <table class="normal-table">
                    <tbody>
                        <tr>
                            <td>订单ID(oid)</td>
                            <td><%= args.oid %></td>
                            <td>行程ID(trip_id)</td>
                            <td><%= args.trip_id %></td>
                            <td>是否为川流快车(is_fastcar)</td>
                            <td><%= ['不是', '是'][args.is_fastcar] ||  args.is_fastcar %></td>
                        </tr>
                    </tbody>
               </table>
            </div>
        </div>
    </div>
<% } %>

<% if(type==='exports-scene-messages-taxidJudgeCancel-template'){ %>
    <div class="taxidJudgeCancel">
        <ul class="inner-nav-tabs" role="tablist">
            <li class="inner-tab js-inner-tab active" data-target="0"><a href="javascript:void(0)">基础信息</a></li>
        </ul>
        <div class="inner-tab-content js-inner-tab-content">
            <div class="inner-tab-pane js-inner-tab-pane active">
               <table class="normal-table">
                    <tbody>
                        <tr>
                            <% args.data = args.data || {} %>
                            <td>返回码(errno)</td>
                            <td><%= args.errno %></td>
                            <td>返回信息(errmsg)</td>
                            <td><%= args.errmsg %></td>
                            <td>惩罚方案(is_punish)</td>
                            <td><%= ['无责免罚', '1有责免罚', '有责惩罚'][args.data.is_punish] ||  args.data.is_punish %></td>
                            <td>是否命中挽留方案(detain)</td>
                            <td><%= args.detain == '' ? '不命中挽留方案': args.data.detain %></td>
                            <td>用户取消文案说明(detail)</td>
                            <td><%= args.data.detail %></td>
                        </tr>
                        <tr>
                            <td>司机是否到达(is_arrive)</td>
                            <td><%= ['未到达', '已到达'][args.data.is_arrive] || args.data.is_arrive %></td>
                            <td>司机剩余时间(nearby_countdown)</td>
                            <td><%= ({ '-1': '司机已准时到达', '0': '时间已用尽'}[args.data.nearby_countdown]) || args.data.nearby_countdown %></td>
                            <td>乘客剩余时间(arrive_countdown)</td>
                            <td><%= ({ '-1': '乘客已准时到达', '0': '时间已用尽'}[args.data.arrive_countdown]) || args.data.arrive_countdown %></td>
                            <td>司机应到时间(driver_nearby_time)</td>
                            <td><%= args.data.driver_nearby_time %></td>
                            <td>乘客应到时间(passenger_arrive_time)</td>
                            <td><%= args.data.passenger_arrive_time %></td>
                        </tr>
                    </tbody>
               </table>
            </div>
        </div>
    </div>
<% } %>

<% if(type==='exports-scene-messages-taxidSubmitReason-template'){ %>
    <div class="taxidSubmitReason">
        <ul class="inner-nav-tabs" role="tablist">
            <li class="inner-tab js-inner-tab active" data-target="0"><a href="javascript:void(0)">基础信息</a></li>
        </ul>
        <div class="inner-tab-content js-inner-tab-content">
            <div class="inner-tab-pane js-inner-tab-pane active">
                <div>拒单原因(reason)：<%= args.reason %></div>
            </div>
        </div>
    </div>
<% } %>

<% if(type==='exports-scene-messages-taxipTrip-template'){ %>
    <div class="taxipTrip">
        <ul class="inner-nav-tabs" role="tablist">
            <li class="inner-tab js-inner-tab active" data-target="0"><a href="javascript:void(0)">基础信息</a></li>
        </ul>
        <div class="inner-tab-content js-inner-tab-content">
            <div class="inner-tab-pane js-inner-tab-pane active">
                <div>取消原因(content)：<%= args.content %></div>
                <div>取消原因类型(type)：<%= args.type %></div>
            </div>
        </div>
    </div>
<% } %>

<% if(type==='exports-scene-messages-taxipJudgeCancel-template'){ %>
    <div class="taxipJudgeCancel">
        <ul class="inner-nav-tabs" role="tablist">
            <li class="inner-tab js-inner-tab active" data-target="0"><a href="javascript:void(0)">基础信息</a></li>
        </ul>
        <div class="inner-tab-content js-inner-tab-content">
            <div class="inner-tab-pane js-inner-tab-pane active">
               <table class="normal-table">
                    <tbody>
                        <tr>
                            <% args.data = args.data || {}; %>
                            <td>返回码(errno)</td>
                            <td><%= args.errno %></td>
                            <td>返回信息(errmsg)</td>
                            <td><%= args.errmsg %></td>
                            <td>爽约金金额/封禁天数(amount)</td>
                            <td><%= args.data.amount %></td>
                        </tr>
                        <tr>
                            <td>责任方(duty_type)</td>
                            <td><%= ['乘客', '司机', '平台'][args.data.duty_type] || args.data.duty_type %></td>
                            <td>惩罚类型(punish_type)</td>
                            <td><%= ['无', '爽约金', '封禁'][args.data.punish_type] || args.data.punish_type %></td>
                            <td>司机剩余时间(nearby_countdown)</td>
                            <td><%= ({ '-1': '司机已准时到达', '0': '时间已用尽'}[args.data.nearby_countdown]) || args.data.nearby_countdown %></td>
                        </tr>
                        <tr>
                            <td>判责原因</td>
                            <td colspan="5"><%== args.data.content %></td>
                        <tr>
                    </tbody>
               </table>
            </div>
        </div>
    </div>
<% } %>

<% if(type==='exports-scene-messages-default-template'){ %>
    <div class="dFinishOrder">
        <ul class="inner-nav-tabs" role="tablist">
            <li class="inner-tab js-inner-tab active" data-target="0"><a href="javascript:void(0)">请求参数</a></li>
            <li class="inner-tab js-inner-tab" data-target="1"><a href="javascript:void(0)">返回结果</a></li>
        </ul>
        <div class="inner-tab-content js-inner-tab-content">
            <div class="inner-tab-pane js-inner-tab-pane active">
                <pre>
                    <%= xin %>
                </pre>
            </div>
            <div class="inner-tab-pane js-inner-tab-pane">
                <pre>
                    <%= xout %>
                </pre>
            </div>
        </div>
    </div>
<% } %>

