//
//  RNMarkedRangeTextViewManager.m
//  RNMarkedRangeTextInput
//
//  Created by Bell Zhong on 2017/5/18.
//  Copyright © 2017年 shimo. All rights reserved.
//

#import "RNMarkedRangeTextViewManager.h"
#import "RNMarkedRangeTextView.h"

@implementation RNMarkedRangeTextViewManager

RCT_EXPORT_MODULE()

- (UIView *)view
{
    return [[RNMarkedRangeTextView alloc] initWithEventDispatcher:self.bridge.eventDispatcher];
}


RCT_EXPORT_VIEW_PROPERTY(onMarkedRangeChanged, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onChangeText, RCTDirectEventBlock)

@end
