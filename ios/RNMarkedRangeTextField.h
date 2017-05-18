//
//  RNMarkedRangeTextField.h
//  RNMarkedRangeTextInput
//
//  Created by Bell Zhong on 2017/5/18.
//  Copyright © 2017年 shimo. All rights reserved.
//

#import "RCTTextField.h"

@interface RNMarkedRangeTextField : RCTTextField

@property (nonatomic, copy) RCTDirectEventBlock onMarkedRangeChanged;
@property (nonatomic, copy) RCTDirectEventBlock onChangeText;

@end
