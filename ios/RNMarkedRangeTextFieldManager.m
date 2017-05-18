//
//  RNMarkedRangeTextFieldManager.m
//  RNMarkedRangeTextInput
//
//  Created by Bell Zhong on 2017/5/18.
//  Copyright © 2017年 shimo. All rights reserved.
//

#import "RNMarkedRangeTextFieldManager.h"
#import "RNMarkedRangeTextField.h"

@implementation RNMarkedRangeTextFieldManager

RCT_EXPORT_MODULE()

- (UIView *)view
{
    return [[RNMarkedRangeTextField alloc] initWithEventDispatcher:self.bridge.eventDispatcher];
}

RCT_EXPORT_VIEW_PROPERTY(onMarkedRangeChanged, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onChangeText, RCTDirectEventBlock)

@end
