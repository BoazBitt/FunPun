totalUnits = 100


def calcit(score):
    if score == 0:
        userLevel = 1
        userUnit = 1
    elif score == 100:
        userLevel = int(totalUnits * 0.7 / 10)
        userUnit = 1
    else:
        levelPercentage = score / 100 * 0.6  # calculate the percentage of the highest possible level
        userLevel = int(totalUnits * levelPercentage / 10) + 1  # calculate the user level based on the percentage
        userUnit = int((totalUnits * levelPercentage % 10) + 1)  # calculate the user unit based on the remainder
    return userLevel, userUnit


def calculate_user_level(score):
    # calculate the total number of units
    total_units = (totalUnits + 4) // 5

    # calculate the target unit based on the score
    if score == 0:
        target_unit = 1
    else:
        target_unit = int((score / 100) * 0.7 * total_units)
        if target_unit == 0:
            target_unit = 1

    # calculate the target level and unit
    target_level = (target_unit - 1) // 3 + 1
    target_unit_in_level = (target_unit - 1) % 3 + 1

    return (target_level, target_unit_in_level)


print("100")
print(calcit(100))
print(calculate_user_level(100))
print("0")
print(calcit(0))
print(calculate_user_level(0))
print("50")
print(calcit(50))
print(calculate_user_level(50))
print("20")
print(calcit(20))
print(calculate_user_level(20))
print("32")
print(calcit(32))
print(calculate_user_level(32))
print("91")
print(calcit(91))
print(calculate_user_level(91))
